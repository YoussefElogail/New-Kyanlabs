import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.kyanlabs.com",  
        // port: "8080",           
        pathname: "/images/**",          
      },
    ],
  },
};

export default withNextIntl(nextConfig);
