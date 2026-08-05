import type { Metadata } from "next";
import Link from "next/link";
import { getTags } from "@/lib/strapi";
import { companyInfo } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "文章标签",
  description: `浏览${companyInfo.name}所有文章标签，按标签分类浏览物流行业动态和运输知识。`,
  alternates: {
    canonical: `https://${companyInfo.domain}/tags/`,
  },
};

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <>
      <section className="bg-brand-900 py-16">
        <div className="safety-stripes-thin h-1.5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display tracking-wide uppercase">
            文章标签
          </h1>
          <p className="text-xl text-brand-400">
            按标签分类浏览物流行业动态和运输知识
          </p>
        </div>
      </section>

      <section className="py-16 bg-neutral-50 min-h-[400px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {tags.length > 0 ? (
            <>
              <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link href="/" className="hover:text-accent-400">首页</Link>
                <span>/</span>
                <Link href="/news" className="hover:text-accent-400">新闻资讯</Link>
                <span>/</span>
                <span className="text-neutral-900">标签</span>
              </nav>

              <div className="flex flex-wrap gap-4">
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-l-4 border-accent-500 hover:border-accent-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
                  >
                    <span className="text-lg font-bold text-neutral-900 group-hover:text-accent-500 transition-colors font-display tracking-wide">
                      {tag.name}
                    </span>
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-accent-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold text-neutral-700 mb-2 font-display uppercase tracking-wide">标签即将上线</h2>
              <p className="text-neutral-500 mb-8">文章标签功能正在准备中，敬请期待</p>
              <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white font-bold uppercase tracking-wide text-sm hover:bg-brand-600 transition-colors">
                浏览全部文章
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
