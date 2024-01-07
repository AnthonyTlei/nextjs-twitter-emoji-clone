/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import withPWA from "next-pwa";

/** @type {import("next").NextConfig} */
const config = {
  ...withPWA({
    // @ts-ignore
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
  }),
  images: {
    remotePatterns: [{ hostname: "img.clerk.com" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
