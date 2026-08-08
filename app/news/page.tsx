import Link from "next/link";
import type { Metadata } from "next";
import { companyInfo } from "@/lib/data";
import { getArticles } from "@/lib/payload";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "新闻资讯",
  description: `${companyInfo.name}新闻资讯中心，了解最新物流行业动态、公司新闻及货运物流相关知识。`,
  alternates: { canonical: `https://${companyInfo.domain}/news/` },
};

export default async function NewsPage() {
  const { articles } = await getArticles(1, 20);

  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?auto=format&fit=crop&w=1920&q=80"
            alt="物流新闻"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-brand-900/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="safety-stripes-thin h-2 w-24 mx-auto mb-4"></div>
          <p className="text-accent-500 font-display font-semibold uppercase tracking-widest text-sm mb-3">
            NEWS & UPDATES
          </p>
          <h1 className="text-5xl font-display font-bold text-white">
            新闻资讯
          </h1>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="industrial-card overflow-hidden card-hover group"
                >
                  {article.coverImage ? (
                    <div className="aspect-video overflow-hidden bg-brand-100">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-brand-800 flex items-center justify-center">
                      <svg className="w-12 h-12 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-accent-600 font-bold uppercase tracking-wide">
                        {new Date(article.publishedAt).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-brand-500 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-accent-600 font-bold text-sm uppercase tracking-wide">
                      阅读全文
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-brand-50 border border-brand-200">
              <svg className="w-16 h-16 text-brand-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-lg text-brand-400 font-medium">暂无文章</p>
              <p className="text-sm text-brand-300 mt-2">请稍后再来查看</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
