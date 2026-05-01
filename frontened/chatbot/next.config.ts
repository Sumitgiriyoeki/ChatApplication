import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: "export", 
  images: {
    unoptimized: true, // required for static export
  },
   basePath: process.env.NODE_ENV === "production"
    // ? "/frontened/chatbot"
     ? "/ChatApplication" : "",

   assetPrefix: process.env.NODE_ENV === "production"
    ? "/ChatApplication/" : "",
};

export default nextConfig;
