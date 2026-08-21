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
          border: "4px solid #61d6d6",
          background: "#071419",
          color: "#f4b860",
          fontFamily: "monospace",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "-2px",
        }}
      >
        OS
      </div>
    ),
    size,
  );
}
