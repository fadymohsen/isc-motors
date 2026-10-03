import { ImageResponse } from "next/og";

export const alt = "JIMS 2026 | Jeddah International Motor Show";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
        }}
      >
        <span
          style={{
            fontSize: 160,
            fontWeight: 700,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#ff0f10" }}>Ji</span>
          <span style={{ color: "#ffffff" }}>MS</span>
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#999999",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Jeddah International Motor Show 2026
        </span>
      </div>
    ),
    { ...size },
  );
}
