/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gajrsoefybqm4ylo.public.blob.vercel-storage.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
