import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon({
      iconDir: "./src/assets/icons",
    }),
    mdx(),
    react(),
  ],
  output: "hybrid",
  adapter: vercel(),
});
