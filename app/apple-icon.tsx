import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          border: "8px solid #61d6d6",
          background: "#071419",
          color: "#f4b860",
          fontFamily: "monospace",
          fontSize: 58,
          fontWeight: 800,
          letterSpacing: "-5px",
        }}
      >
        <span>OS</span>
        <span style={{ color: "#d9f4ed", fontSize: 24, letterSpacing: "3px" }}>KR</span>
      </div>
    ),
    size,
  );
}
