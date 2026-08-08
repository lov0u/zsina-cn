/**
 * Payload CMS API 客户端
 * 对接 payload.ra0.cn 后端
 */

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://payload.ra0.cn'
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY || ''

// 媒体库返回的 url 可能已是绝对地址（https://payload.ra0.cn/api/media/file/...），
// 此时不能再拼 PAYLOAD_URL，否则会变成 http://…https://… 双 URL 导致缩略图裂图。
function toAbsUrl(url: string): string {
  return /^https?:\/\//.test(url) ? url : `${PAYLOAD_URL}${url}`
}

// 当前站点标识（每个站需要改成自己的）
const SITE_SLUG = 'zsina'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  publishedAt: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

export interface ArticleListItem {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: string
  publishedAt: string
}

function getHeaders(): Record<string, string> {
  return PAYLOAD_API_KEY
    ? { Authorization: `Users API Key ${PAYLOAD_API_KEY}` }
    : {}
}

function mapArticleListItem(doc: any): ArticleListItem {
  return {
    id: String(doc.id),
    title: doc.title || '无标题',
    slug: doc.slug || `article-${doc.id}`,
    excerpt: doc.excerpt || '',
    coverImage: doc.coverImage?.url
      ? toAbsUrl(doc.coverImage.url)
      : undefined,
    publishedAt: doc.publishedAt || doc.createdAt || new Date().toISOString(),
  }
}

function mapArticle(doc: any): Article {
  return {
    id: String(doc.id),
    title: doc.title || '无标题',
    slug: doc.slug || `article-${doc.id}`,
    excerpt: doc.excerpt || '',
    content: doc.content || '',
    coverImage: doc.coverImage?.url
      ? toAbsUrl(doc.coverImage.url)
      : undefined,
    publishedAt: doc.publishedAt || doc.createdAt || new Date().toISOString(),
    metaTitle: doc.metaTitle || doc.title,
    metaDescription: doc.metaDescription || doc.excerpt,
    metaKeywords: doc.metaKeywords,
  }
}

/**
 * 获取文章列表
 */
export async function getArticles(
  page = 1,
  pageSize = 20
): Promise<{ articles: ArticleListItem[]; total: number }> {
  try {
    const url = `${PAYLOAD_URL}/api/articles?where[site.slug][equals]=${SITE_SLUG}&where[status][equals]=published&sort=-publishedAt&page=${page}&limit=${pageSize}&depth=1`

    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 }, // ISR: 每分钟重新验证，保证新文章/配图快速可见
    })

    if (!res.ok) {
      console.error('Payload API error:', res.status)
      return { articles: [], total: 0 }
    }

    const data = await res.json()
    const articles: ArticleListItem[] = (data.docs || []).map(mapArticleListItem)

    return {
      articles,
      total: data.total || 0,
    }
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return { articles: [], total: 0 }
  }
}

/**
 * 获取单篇文章
 */
export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const url = `${PAYLOAD_URL}/api/articles?where[slug][equals]=${slug}&where[site.slug][equals]=${SITE_SLUG}&where[status][equals]=published&depth=1`

    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error('Payload API error:', res.status)
      return null
    }

    const data = await res.json()
    if (!data.docs || data.docs.length === 0) {
      return null
    }

    return mapArticle(data.docs[0])
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

/**
 * 获取所有文章 slug（用于 generateStaticParams）
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const { articles } = await getArticles(1, 100)
    return articles.map((a) => a.slug)
  } catch {
    return []
  }
}

export interface Tag {
  id: string
  name: string
  slug: string
}

/**
 * 获取所有标签（当前站点下的标签）
 */
export async function getTags(): Promise<Tag[]> {
  try {
    const url = `${PAYLOAD_URL}/api/tags?where[site.slug][equals]=${SITE_SLUG}&limit=100`

    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error('Payload API error:', res.status)
      return []
    }

    const data = await res.json()
    const tags: Tag[] = (data.docs || []).map((item: any) => ({
      id: String(item.id),
      name: item.name || item.slug,
      slug: item.slug || `tag-${item.id}`,
    }))

    return tags
  } catch (error) {
    console.error('Failed to fetch tags:', error)
    return []
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
    // 先获取标签信息
    const tagUrl = `${PAYLOAD_URL}/api/tags?where[slug][equals]=${tagSlug}&where[site.slug][equals]=${SITE_SLUG}&limit=1`
    const tagRes = await fetch(tagUrl, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    })

    let tag: Tag | null = null
    if (tagRes.ok) {
      const tagData = await tagRes.json()
      if (tagData.docs && tagData.docs.length > 0) {
        tag = {
          id: String(tagData.docs[0].id),
          name: tagData.docs[0].name || tagData.docs[0].slug,
          slug: tagData.docs[0].slug,
        }
      }
    }

    // 获取该标签下的文章
    const url = `${PAYLOAD_URL}/api/articles?where[tags.slug][equals]=${tagSlug}&where[site.slug][equals]=${SITE_SLUG}&where[status][equals]=published&sort=-publishedAt&page=${page}&limit=${pageSize}&depth=1`

    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error('Payload API error:', res.status)
      return { articles: [], total: 0, tag }
    }

    const data = await res.json()
    const articles: ArticleListItem[] = (data.docs || []).map(mapArticleListItem)

    return {
      articles,
      total: data.total || 0,
      tag,
    }
  } catch (error) {
    console.error('Failed to fetch articles by tag:', error)
    return { articles: [], total: 0, tag: null }
  }
}

/**
 * 获取所有标签 slug（用于 generateStaticParams）
 */
export async function getAllTagSlugs(): Promise<string[]> {
  try {
    const tags = await getTags()
    return tags.map((t) => t.slug)
  } catch {
    return []
  }
}

