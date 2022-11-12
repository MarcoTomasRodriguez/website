/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "es"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
