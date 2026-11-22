import { ImageResponse } from "next/og";

export const alt = "Gallery Hello — Beautiful Portraits & Exclusive Collections";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A static export has no server to render this route at request time, so
// the route is prerendered into a file during the build.
export const dynamic = "force-static";

/**
 * The default social sharing image for the site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#101014",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 6,
            color: "#AAA6AF",
            textTransform: "uppercase",
          }}
        >
          Curated Visual Collections
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            lineHeight: 1.1,
            color: "#F5F2EF",
          }}
        >
          GALLERY HELLO.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#AAA6AF",
          }}
        >
          Curated AI Portraits &amp; Visual Stories.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 120,
            height: 6,
            background: "#C29B84",
          }}
        />
      </div>
    ),
    size,
  );
}
