import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:['drive.google.com','lh3.googleusercontent.com','media.licdn.com']}
,experimental: {
    serverActions: { bodySizeLimit: '2mb' },
},
};
export default nextConfig;
