import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

interface PackageInfo {
  name: string;
  current: string;
  latest: string;
  isDev: boolean;
  status: "up-to-date" | "minor-update" | "major-update" | "unknown";
}

function cleanVersion(version: string): string {
  return version.replace(/^[\^~>=<]+/, "");
}

function getMajor(version: string): number {
  return parseInt(version.split(".")[0], 10);
}

async function getLatestVersion(packageName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${packageName}/latest`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.version || null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const pkgPath = join(process.cwd(), "package.json");
    const pkgJson = JSON.parse(readFileSync(pkgPath, "utf-8"));

    const deps = pkgJson.dependencies || {};
    const devDeps = pkgJson.devDependencies || {};

    const allDeps = [
      ...Object.entries(deps).map(([name, version]) => ({
        name,
        version: version as string,
        isDev: false,
      })),
      ...Object.entries(devDeps).map(([name, version]) => ({
        name,
        version: version as string,
        isDev: true,
      })),
    ];

    // Fetch latest versions in parallel (batch of 10 at a time)
    const results: PackageInfo[] = [];
    const batchSize = 10;

    for (let i = 0; i < allDeps.length; i += batchSize) {
      const batch = allDeps.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (dep) => {
          const current = cleanVersion(dep.version);
          const latest = await getLatestVersion(dep.name);

          let status: PackageInfo["status"] = "unknown";
          if (latest) {
            if (current === latest) {
              status = "up-to-date";
            } else if (getMajor(current) < getMajor(latest)) {
              status = "major-update";
            } else {
              status = "minor-update";
            }
          }

          return {
            name: dep.name,
            current,
            latest: latest || "unknown",
            isDev: dep.isDev,
            status,
          };
        })
      );
      results.push(...batchResults);
    }

    // Sort: major updates first, then minor, then up-to-date
    const order = { "major-update": 0, "minor-update": 1, unknown: 2, "up-to-date": 3 };
    results.sort((a, b) => order[a.status] - order[b.status]);

    return NextResponse.json({
      packages: results,
      summary: {
        total: results.length,
        upToDate: results.filter((r) => r.status === "up-to-date").length,
        minorUpdates: results.filter((r) => r.status === "minor-update").length,
        majorUpdates: results.filter((r) => r.status === "major-update").length,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to check dependencies" },
      { status: 500 }
    );
  }
}
