import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'm0o6rdu7md.ufs.sh',
      }
      // new URL('m0o6rdu7md.ufs.sh')
    ],
    // localPatterns: [
    //   {
    //     pathname: '/public/**',
    //     search: '',
    //   },
    // ],
  },
};

export default nextConfig;
