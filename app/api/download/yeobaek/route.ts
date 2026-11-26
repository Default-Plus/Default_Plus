import { NextRequest, NextResponse } from "next/server";

const GITHUB_RELEASES_API =
  "https://api.github.com/repos/Default-Plus/yeobaek/releases?per_page=10";
const GITHUB_RELEASES_FALLBACK =
  "https://github.com/Default-Plus/yeobaek/releases";

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubReleaseResponse {
  tag_name?: string;
  draft?: boolean;
  prerelease?: boolean;
  assets?: GitHubReleaseAsset[];
}

type TargetPlatform = "win" | "android" | "other";

function detectPlatformFromUA(userAgent: string): TargetPlatform {
  const ua = userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("windows") || ua.includes("win64") || ua.includes("win32")) {
    return "win";
  }
  return "other";
}

function pickAssetUrl(
  assets: GitHubReleaseAsset[],
  platform: TargetPlatform
): string | null {
  if (platform === "win") {
    const installer = assets.find((a) => {
      const lower = a.name.toLowerCase();
      return lower.endsWith(".exe") && lower.includes("setup");
    });
    if (installer) return installer.browser_download_url;

    const anyExe = assets.find((a) => a.name.toLowerCase().endsWith(".exe"));
    return anyExe?.browser_download_url ?? null;
  }

  if (platform === "android") {
    const apk = assets.find((a) => a.name.toLowerCase().endsWith(".apk"));
    return apk?.browser_download_url ?? null;
  }

  return null;
}

function findLatestAssetAcrossReleases(
  releases: GitHubReleaseResponse[],
  platform: TargetPlatform
): string | null {
  // Prefer stable releases first, then fall back to prereleases if needed
  const ordered = [
    ...releases.filter((r) => !r.draft && !r.prerelease),
    ...releases.filter((r) => !r.draft && r.prerelease),
  ];

  for (const release of ordered) {
    const matched = pickAssetUrl(release.assets ?? [], platform);
    if (matched) return matched;
  }

  return null;
}

export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("platform")?.toLowerCase();
  const isExplicitPlatform = param === "win" || param === "android";

  const platform: TargetPlatform = isExplicitPlatform
    ? param
    : detectPlatformFromUA(request.headers.get("user-agent") ?? "");

  if (platform === "other") {
    return NextResponse.redirect(GITHUB_RELEASES_FALLBACK, {
      status: 302,
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  try {
    const res = await fetch(GITHUB_RELEASES_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Default-Plus-Portfolio",
      },
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.redirect(GITHUB_RELEASES_FALLBACK, {
        status: 302,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const releases = (await res.json()) as GitHubReleaseResponse[];
    const downloadUrl = findLatestAssetAcrossReleases(
      Array.isArray(releases) ? releases : [],
      platform
    );

    if (!downloadUrl) {
      return NextResponse.redirect(GITHUB_RELEASES_FALLBACK, {
        status: 302,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.redirect(downloadUrl, {
      status: 302,
      headers: {
        "Cache-Control": isExplicitPlatform
          ? "public, s-maxage=600, stale-while-revalidate=3600"
          : "private, no-store",
      },
    });
  } catch {
    return NextResponse.redirect(GITHUB_RELEASES_FALLBACK, {
      status: 302,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
