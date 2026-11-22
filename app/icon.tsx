import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// A static export has no server to render this route at request time, so
// the route is prerendered into a file during the build.
export const dynamic = "force-static";

/**
 * The favicon: the brand mark — a warm accent dot on the dark background.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101014",
          borderRadius: 6,
          color: "#C29B84",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        G
      </div>
    ),
    size,
  );
}
