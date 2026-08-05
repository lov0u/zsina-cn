/**
 * Strapi API 客户端
 * 对接 strapi.ra0.cn 后端，site 过滤值为 zsina
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://strapi.ra0.cn";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface ArticleListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
}

/**
 * 获取文章列表
 */
export async function getArticles(
  page = 1,
  pageSize = 20
): Promise<{ articles: ArticleListItem[]; total: number }> {
  try {
    const url = `${STRAPI_URL}/api/articles?fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=publishedAt&populate[coverImage][fields][0]=url&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=publishedAt:desc&filters[site][slug][$eq]=zsina`;

    const res = await fetch(url, {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : {},
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error("Strapi API error:", res.status, await res.text());
      return { articles: [], total: 0 };
    }

    const data = await res.json();
    const articles: ArticleListItem[] = (data.data || []).map((item: any) => ({
      id: item.id,
      title: item.title || "无标题",
      slug: item.slug || `article-${item.id}`,
      excerpt: item.excerpt || "",
      coverImage: item.coverImage?.url
        ? `${STRAPI_URL}${item.coverImage.url}`
        : undefined,
      publishedAt: item.publishedAt || new Date().toISOString(),
    }));

    return {
      articles,
      total: data.meta?.pagination?.total || 0,
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return { articles: [], total: 0 };
  }
}

/**
 * 获取单篇文章
 */
export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const url = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&filters[site][slug][$eq]=zsina&populate=*`;

    const res = await fetch(url, {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : {},
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error("Strapi API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      return null;
    }

    const item = data.data[0];
    return {
      id: item.id,
      title: item.title || "无标题",
      slug: item.slug || `article-${item.id}`,
      excerpt: item.excerpt || "",
      content: item.content || "",
      coverImage: item.coverImage?.url
        ? `${STRAPI_URL}${item.coverImage.url}`
        : undefined,
      publishedAt: item.publishedAt || new Date().toISOString(),
      metaTitle: item.metaTitle || item.title,
      metaDescription: item.metaDescription || item.excerpt,
      metaKeywords: item.metaKeywords,
    };
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return null;
  }
}

/**
 * 获取所有文章 slug（用于 generateStaticParams）
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const { articles } = await getArticles(1, 100);
    return articles.map((a) => a.slug);
  } catch {
    return [];
  }
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

/**
 * 获取所有标签（仅返回当前站点下有文章的标签）
 */
export async function getTags(): Promise<Tag[]> {
  try {
    const url = `${STRAPI_URL}/api/tags?filters[articles][site][slug][$eq]=zsina&fields[0]=name&fields[1]=slug&pagination[pageSize]=100`;

    const res = await fetch(url, {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : {},
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error("Strapi API error:", res.status);
      return [];
    }

    const data = await res.json();
    const tags: Tag[] = (data.data || []).map((item: any) => ({
      id: item.id,
      name: item.name || item.slug,
      slug: item.slug || `tag-${item.id}`,
    }));

    return tags;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
}

/**
 * 获取标签下的文章列表
 */
export async function getArticlesByTag(
  tagSlug: string,
  page = 1,
  pageSize = 20
): Promise<{ articles: ArticleListItem[]; total: number; tag: Tag | null }> {
  try {
    const tagUrl = `${STRAPI_URL}/api/tags?filters[slug][$eq]=${tagSlug}&fields[0]=name&fields[1]=slug`;
    const tagRes = await fetch(tagUrl, {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : {},
      cache: 'no-store',
    });

    let tag: Tag | null = null;
    if (tagRes.ok) {
      const tagData = await tagRes.json();
      if (tagData.data && tagData.data.length > 0) {
        tag = {
          id: tagData.data[0].id,
          name: tagData.data[0].name || tagData.data[0].slug,
          slug: tagData.data[0].slug,
        };
      }
    }

    const url = `${STRAPI_URL}/api/articles?fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=publishedAt&populate[coverImage][fields][0]=url&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=publishedAt:desc&filters[site][slug][$eq]=zsina&filters[tags][slug][$eq]=${tagSlug}`;

    const res = await fetch(url, {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : {},
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error("Strapi API error:", res.status);
      return { articles: [], total: 0, tag };
    }

    const data = await res.json();
    const articles: ArticleListItem[] = (data.data || []).map((item: any) => ({
      id: item.id,
      title: item.title || "无标题",
      slug: item.slug || `article-${item.id}`,
      excerpt: item.excerpt || "",
      coverImage: item.coverImage?.url
        ? `${STRAPI_URL}${item.coverImage.url}`
        : undefined,
      publishedAt: item.publishedAt || new Date().toISOString(),
    }));

    return {
      articles,
      total: data.meta?.pagination?.total || 0,
      tag,
    };
  } catch (error) {
    console.error("Failed to fetch articles by tag:", error);
    return { articles: [], total: 0, tag: null };
  }
}

/**
 * 获取所有标签 slug（用于 generateStaticParams）
 */
export async function getAllTagSlugs(): Promise<string[]> {
  try {
    const tags = await getTags();
    return tags.map((t) => t.slug);
  } catch {
    return [];
  }
}
