/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片配置
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "strapi.ra0.cn",
      },
      {
        protocol: "https",
        hostname: "strapi.ra0.cn",
      },
    ],
  },

  // 压缩
  compress: true,

  // poweredByHeader
  poweredByHeader: false,

  // trailingSlash
  trailingSlash: true,
};

module.exports = nextConfig;
