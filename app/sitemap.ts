import type { MetadataRoute } from "next";
import { services, companyInfo } from "@/lib/data";
import { getArticles, getTags } from "@/lib/strapi";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${companyInfo.domain}`;
  const lastModified = new Date();

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news/`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 服务页面
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // 文章页面
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const { articles } = await getArticles(1, 100);
    articlePages = articles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}/`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Strapi 未就绪时跳过
  }

  // 标签页面
  let tagPages: MetadataRoute.Sitemap = [];
  try {
    const tags = await getTags();
    tagPages = tags.map((tag) => ({
      url: `${baseUrl}/tags/${tag.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
    tagPages.push({
      url: `${baseUrl}/tags/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    });
  } catch {
    // Strapi 未就绪时跳过
  }

  return [...staticPages, ...servicePages, ...articlePages, ...tagPages];
}
