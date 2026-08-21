import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "OperatingSoni-KR // Mourad Kraiem",
    short_name: "OSKR",
    description:
      "Mourad Kraiem's custom retro-computing portfolio for AI and machine learning work.",
    start_url: "/",
    display: "standalone",
    background_color: "#071419",
    theme_color: "#071419",
    orientation: "any",
    categories: ["portfolio", "education", "technology"],
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
