import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { companyInfo } from "@/lib/data";
import { getArticle, getArticles } from "@/lib/payload";
import ArticleCharts from "@/app/ArticleCharts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const { articles } = await getArticles(1, 100);
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "文章未找到" };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.metaKeywords?.split(","),
    alternates: {
      canonical: `https://${companyInfo.domain}/news/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* 面包屑 */}
      <div className="bg-brand-100 border-b border-brand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-brand-500">
            <Link href="/" className="hover:text-accent-600">首页</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-accent-600">新闻资讯</Link>
            <span>/</span>
            <span className="text-brand-900 font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 文章头部 */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="safety-stripes-thin h-1.5 w-16 mb-6"></div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-brand-500 mb-8">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(article.publishedAt).toLocaleDateString("zh-CN")}
            </span>
          </div>
        </div>
      </section>

      {/* 正文 */}
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.excerpt && (
            <div className="bg-brand-50 border-l-4 border-accent-500 p-4 mb-8">
              <p className="text-brand-600 font-medium">{article.excerpt}</p>
            </div>
          )}
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <ArticleCharts />

        </div>
      </section>

      {/* 底部导航 */}
      <section className="py-12 bg-brand-50 border-t border-brand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-accent-600 font-bold text-sm uppercase tracking-wide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            返回新闻列表
          </Link>
          <a
            href={`mailto:${companyInfo.email}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-800 text-white font-bold rounded-sm hover:bg-accent-500 hover:text-brand-900 transition-colors text-sm uppercase tracking-wide"
          >
            联系我们
          </a>
        </div>
      </section>
    </>
  );
}
