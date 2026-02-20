"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils";
import { OATH_CATEGORIES, STORY_PIN_COLOR } from "@/lib/constants";
import type { MapPin } from "@/lib/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StoryMapPin {
  id: string;
  display_name: string;
  category: "story";
  pin_color: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  title?: string;
  slug?: string;
}

type AnyPin = MapPin | StoryMapPin;

type FilterCategory = "struggling" | "memory" | "supporter" | "story";

interface CategoryMeta {
  label: string;
  color: string;
}

const CATEGORY_META: Record<FilterCategory, CategoryMeta> = {
  struggling: { label: "Struggling", color: OATH_CATEGORIES.struggling.color },
  memory: { label: "In Memory", color: OATH_CATEGORIES.memory.color },
  supporter: { label: "Supporter", color: OATH_CATEGORIES.supporter.color },
  story: { label: "Story Sharer", color: STORY_PIN_COLOR },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OathMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const [pins, setPins] = useState<AnyPin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [filters, setFilters] = useState<Record<FilterCategory, boolean>>({
    struggling: true,
    memory: true,
    supporter: true,
    story: true,
  });

  // ---- Stats derived from pins ------------------------------------------
  const stats = pins.reduce(
    (acc, pin) => {
      const cat = pin.category as FilterCategory;
      if (cat in acc) acc[cat]++;
      acc.total++;
      return acc;
    },
    { struggling: 0, memory: 0, supporter: 0, story: 0, total: 0 } as Record<
      string,
      number
    >
  );

  // ---- Fetch pins -------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    async function fetchPins() {
      try {
        const res = await fetch("/api/map-pins");
        if (!res.ok) throw new Error(`Failed to load pins (${res.status})`);
        const data = await res.json();
        if (!cancelled) {
          setPins(data.pins ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load map data"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPins();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Build GeoJSON from pins + active filters -------------------------
  const buildGeoJSON = useCallback(
    (activePins: AnyPin[]): GeoJSON.FeatureCollection => ({
      type: "FeatureCollection",
      features: activePins
        .filter(
          (p) =>
            p.latitude != null &&
            p.longitude != null &&
            filters[p.category as FilterCategory]
        )
        .map((p) => ({
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [p.longitude, p.latitude],
          },
          properties: {
            id: p.id,
            display_name: p.display_name,
            category: p.category,
            pin_color: p.pin_color,
            city: p.city ?? "",
            state: p.state ?? "",
            title: (p as StoryMapPin).title ?? "",
            slug: (p as StoryMapPin).slug ?? "",
          },
        })),
    }),
    [filters]
  );

  // ---- Initialise Mapbox map --------------------------------------------
  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return; // already initialised

    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5795, 39.8283],
      zoom: 3.5,
      minZoom: 2,
      maxZoom: 15,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.on("load", () => {
      // --- Source: clustered pins ---
      map.addSource("oath-pins", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 50,
      });

      // --- Layer: cluster circles ---
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "oath-pins",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#3EABA8", // < 25
            25,
            "#4A6FA5", // 25-100
            100,
            "#7AB87A", // 100-500
            500,
            "#E8956F", // 500+
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18, // < 25
            25,
            24, // 25-100
            100,
            30, // 100-500
            500,
            38, // 500+
          ],
          "circle-stroke-width": 3,
          "circle-stroke-color": "rgba(255,255,255,0.7)",
        },
      });

      // --- Layer: cluster count text ---
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "oath-pins",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 13,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      // --- Layer: individual pins ---
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "oath-pins",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": ["get", "pin_color"],
          "circle-radius": 7,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      // --- Cluster click: zoom in ---
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        if (!features.length) return;
        const clusterId = features[0].properties?.cluster_id;
        const source = map.getSource("oath-pins") as mapboxgl.GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          const geom = features[0].geometry;
          if (geom.type === "Point") {
            map.easeTo({
              center: geom.coordinates as [number, number],
              zoom: zoom ?? 10,
            });
          }
        });
      });

      // --- Pin click: show popup ---
      map.on("click", "unclustered-point", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        const geom = feature.geometry;
        if (geom.type !== "Point") return;
        const coords = geom.coordinates.slice() as [number, number];
        const props = feature.properties!;

        const category = props.category as FilterCategory;
        const meta = CATEGORY_META[category];
        const displayName = props.display_name || "Anonymous";
        const location = [props.city, props.state]
          .filter(Boolean)
          .join(", ");

        let html = `
          <div style="font-family:system-ui,sans-serif;min-width:180px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="width:10px;height:10px;border-radius:50%;background:${meta?.color ?? props.pin_color};display:inline-block;flex-shrink:0;"></span>
              <span style="font-weight:600;font-size:15px;color:#1E2D42;">${displayName}</span>
            </div>
            ${location ? `<p style="margin:0 0 4px;color:#6B7280;font-size:13px;">${location}</p>` : ""}
            <p style="margin:0;color:#4A6FA5;font-size:12px;font-weight:500;">${meta?.label ?? category}</p>
        `;

        if (category === "story" && props.slug) {
          html += `
            <a href="/stories/${props.slug}" style="display:inline-block;margin-top:8px;color:#3EABA8;font-size:13px;font-weight:600;text-decoration:none;">
              Read their story &rarr;
            </a>
          `;
        }

        html += `</div>`;

        // Close existing popup
        if (popupRef.current) {
          popupRef.current.remove();
        }

        const popup = new mapboxgl.Popup({
          offset: 12,
          closeButton: true,
          maxWidth: "260px",
        })
          .setLngLat(coords)
          .setHTML(html)
          .addTo(map);

        popupRef.current = popup;
      });

      // --- Cursors for interactive layers ---
      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = "";
      });

      setMapReady(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ---- Update source data when pins or filters change -------------------
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const source = mapRef.current.getSource(
      "oath-pins"
    ) as mapboxgl.GeoJSONSource | undefined;
    if (!source) return;
    source.setData(buildGeoJSON(pins));
  }, [pins, filters, mapReady, buildGeoJSON]);

  // ---- Toggle category filter -------------------------------------------
  function toggleFilter(cat: FilterCategory) {
    setFilters((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

  // ---- Error state ------------------------------------------------------
  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <svg
              className="h-7 w-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to Load Map
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* ===== Stats Bar ===== */}
      <div className="absolute inset-x-0 top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200/60">
        <div className="flex items-center justify-center gap-4 sm:gap-6 px-4 py-2.5 overflow-x-auto text-sm">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-bold text-gray-900 text-base">
              {stats.total.toLocaleString()}
            </span>
            <span className="text-gray-500 hidden sm:inline">Total Pins</span>
            <span className="text-gray-500 sm:hidden">Total</span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          {(
            Object.entries(CATEGORY_META) as [FilterCategory, CategoryMeta][]
          ).map(([key, meta]) => (
            <div
              key={key}
              className="flex items-center gap-1.5 whitespace-nowrap"
            >
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: meta.color }}
              />
              <span className="font-semibold text-gray-800">
                {(stats[key] ?? 0).toLocaleString()}
              </span>
              <span className="text-gray-500 hidden md:inline">
                {meta.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Map Container ===== */}
      <div ref={mapContainer} className="h-full w-full" />

      {/* ===== Loading overlay ===== */}
      {(loading || !mapReady) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm">
          <div className="relative mb-4">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-teal" />
          </div>
          <p className="text-sm font-medium text-gray-600">
            Loading the movement map...
          </p>
        </div>
      )}

      {/* ===== Filter Controls (top-right) ===== */}
      {mapReady && (
        <div className="absolute right-3 top-14 z-10 sm:right-4 sm:top-16">
          <div className="rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200/60 p-3 sm:p-4 w-[200px]">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Filter by Category
            </p>
            <div className="space-y-2">
              {(
                Object.entries(CATEGORY_META) as [
                  FilterCategory,
                  CategoryMeta,
                ][]
              ).map(([key, meta]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => toggleFilter(key)}
                      className="peer sr-only"
                    />
                    <div
                      className={cn(
                        "h-4 w-4 rounded border-2 transition-all flex items-center justify-center",
                        filters[key]
                          ? "border-transparent"
                          : "border-gray-300 bg-white"
                      )}
                      style={
                        filters[key]
                          ? { backgroundColor: meta.color }
                          : undefined
                      }
                    >
                      {filters[key] && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      filters[key] ? "text-gray-800" : "text-gray-400"
                    )}
                  >
                    {meta.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== Legend (bottom-left) ===== */}
      {mapReady && (
        <div className="absolute bottom-6 left-3 z-10 sm:left-4">
          <div className="rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200/60 p-3 sm:p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Legend
            </p>
            <div className="space-y-1.5">
              {(
                Object.entries(CATEGORY_META) as [
                  FilterCategory,
                  CategoryMeta,
                ][]
              ).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: meta.color }}
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {meta.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2.5 border-t border-gray-200/60">
              <p className="text-[10px] text-gray-400 leading-tight">
                Clusters show grouped pins.
                <br />
                Click to zoom in.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
