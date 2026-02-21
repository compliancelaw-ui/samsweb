"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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

type FilterCategory = "supporting" | "supporter" | "hope" | "story";

interface CategoryMeta {
  label: string;
  color: string;
}

const CATEGORY_META: Record<FilterCategory, CategoryMeta> = {
  supporting: { label: "Supporting a Loved One", color: OATH_CATEGORIES.supporting.color },
  supporter: { label: "Standing With You", color: OATH_CATEGORIES.supporter.color },
  hope: { label: "Hope & Recovery", color: OATH_CATEGORIES.hope.color },
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

  // ---- Build GeoJSON from pins ------------------------------------------
  const buildGeoJSON = useCallback(
    (activePins: AnyPin[]): GeoJSON.FeatureCollection => ({
      type: "FeatureCollection",
      features: activePins
        .filter((p) => p.latitude != null && p.longitude != null)
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
    []
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
      maxBounds: [
        [-130, 20], // Southwest: west of Hawaii
        [-60, 55],  // Northeast: north of Maine
      ],
      projection: "mercator",
      attributionControl: false,
      scrollZoom: false,
      dragRotate: false,
      touchPitch: false,
      pitchWithRotate: false,
    });

    // Disable touch rotation (keep pinch-to-zoom)
    map.touchZoomRotate.disableRotation();

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

  // ---- Update source data when pins change --------------------------------
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const source = mapRef.current.getSource(
      "oath-pins"
    ) as mapboxgl.GeoJSONSource | undefined;
    if (!source) return;
    source.setData(buildGeoJSON(pins));
  }, [pins, mapReady, buildGeoJSON]);

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
    </div>
  );
}
