import Link from "next/link";
import type { Metadata } from "next";
import { services, companyInfo, stats } from "@/lib/data";
import { getArticles } from "@/lib/payload";
import ServiceIcon from "@/components/ServiceIcon";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${companyInfo.name} - 专业货运物流 | 长途运输 冷链物流 大件运输 仓储服务`,
  description: companyInfo.description,
  alternates: { canonical: `https://${companyInfo.domain}` },
};

export default async function HomePage() {
  const { articles } = await getArticles(1, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* 背景图片 */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1920&q=80"
            alt="货运卡车行驶在公路上"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/80 to-brand-900/60"></div>
        </div>

        {/* 工业网格叠加 */}
        <div className="absolute inset-0 grid-bg z-10 opacity-30"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            {/* 安全条纹装饰 */}
            <div className="safety-stripes-thin h-2 w-24 mb-6"></div>
            <p className="text-accent-500 font-display font-semibold uppercase tracking-widest text-sm mb-4">
              JINGSHENG FREIGHT LOGISTICS
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              沂水景盛货运
            </h1>
            <p className="text-2xl md:text-3xl text-white font-display font-medium mb-8 tracking-wide">
              安全 <span className="text-accent-500">·</span> 高效{" "}
              <span className="text-accent-500">·</span> 守时
            </p>
            <p className="text-lg text-brand-200 mb-10 leading-relaxed max-w-xl">
              专业货运物流服务商，提供长途运输、城市配送、冷链物流、大件运输、仓储服务等综合物流解决方案。全国直达，值得信赖。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="btn-primary">
                了解服务
              </Link>
              <Link href="/contact" className="btn-light">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 运力数据 */}
      <section className="bg-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center border-l-2 border-accent-500 pl-4"
              >
                <div className="font-display font-bold text-5xl md:text-6xl text-white mb-2">
                  {stat.value}
                  <span className="text-2xl text-accent-500 ml-1">
                    {stat.unit}
                  </span>
                </div>
                <div className="text-sm text-brand-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务项目 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="safety-stripes-thin h-1.5 w-16 mx-auto mb-4"></div>
            <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
              OUR SERVICES
            </p>
            <h2 className="text-4xl font-display font-bold text-brand-900">
              服务项目
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="industrial-card p-6 card-hover group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-brand-800 flex items-center justify-center text-accent-500 group-hover:bg-accent-500 group-hover:text-brand-900 transition-colors">
                    <ServiceIcon name={service.icon} className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 font-display">
                    {service.name}
                  </h3>
                </div>
                <p className="text-brand-500 text-sm leading-relaxed mb-4">
                  {service.shortDesc}
                </p>
                <div className="flex items-center gap-2 text-accent-600 font-bold text-sm uppercase tracking-wide">
                  查看详情
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 关于简介 */}
      <section className="py-20 bg-brand-50 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="safety-stripes-thin h-1.5 w-16 mb-4"></div>
              <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
                ABOUT US
              </p>
              <h2 className="text-4xl font-display font-bold text-brand-900 mb-6">
                景盛货运 实力保障
              </h2>
              <p className="text-brand-600 leading-relaxed mb-4">
                {companyInfo.name}成立于2010年，是一家专业从事货运物流的企业。经过十余年发展，公司已形成以长途运输、城市配送、冷链物流、大件运输、仓储服务为核心的综合物流服务体系。
              </p>
              <p className="text-brand-600 leading-relaxed mb-8">
                公司拥有各类专业运输车辆，配备GPS卫星定位系统和智能调度平台，业务覆盖全国各省市区。我们始终坚持"安全、高效、守时"的服务理念，为每一位客户提供优质的物流运输服务。
              </p>
              <Link href="/about" className="btn-primary">
                了解更多
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80"
                alt="物流仓库"
                className="w-full h-80 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 safety-stripes h-4 w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 新闻动态 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="safety-stripes-thin h-1.5 w-16 mb-4"></div>
              <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
                NEWS & UPDATES
              </p>
              <h2 className="text-4xl font-display font-bold text-brand-900">
                新闻动态
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden md:flex items-center gap-2 text-accent-600 font-bold text-sm uppercase tracking-wide hover:text-accent-700"
            >
              查看全部
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="industrial-card overflow-hidden card-hover group"
                >
                  {article.coverImage && (
                    <div className="aspect-[21/9] overflow-hidden bg-brand-100">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="text-xs text-accent-600 font-bold uppercase tracking-wide mb-2">
                      {new Date(article.publishedAt).toLocaleDateString("zh-CN")}
                    </div>
                    <h3 className="text-lg font-bold text-brand-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-brand-500 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-brand-50 border border-brand-200">
              <svg className="w-12 h-12 text-brand-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-brand-400">暂无文章</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA 联系我们 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80"
            alt="货运物流"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-900/90"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="safety-stripes-thin h-2 w-24 mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            需要货运物流服务？
          </h2>
          <p className="text-lg text-brand-200 mb-10 max-w-2xl mx-auto">
            无论您需要长途运输、城市配送、冷链物流还是大件运输，景盛货运都能为您提供专业、高效的物流解决方案。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${companyInfo.email}`} className="btn-primary">
              邮件咨询
            </a>
            <Link href="/contact" className="btn-light">
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
