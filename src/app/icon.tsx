import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#1a1a1a",
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#ff0f10" }}>Ji</span>
          <span style={{ color: "#ffffff" }}>MS</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
