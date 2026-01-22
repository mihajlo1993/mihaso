import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Miha Sodja | Lead Product Designer",
    short_name: "Miha Sodja",
    description:
      "Lead Product Designer specializing in healthcare UX, fintech UI, design systems, and mobile apps. View case studies and get in touch.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["design", "portfolio", "business"],
    lang: "en",
    dir: "ltr",
  }
}
