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
  allowedDevOrigins: ['192.168.1.234'],
};

module.exports = nextConfig;
