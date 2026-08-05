import Link from "next/link";
import { companyInfo, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-300">
      {/* 安全条纹顶部 */}
      <div className="safety-stripes-thin h-1.5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-brand-700 flex items-center justify-center text-accent-500 font-display font-bold text-xl border-l-4 border-accent-500">
                景
              </div>
              <div className="text-lg font-bold text-white font-display tracking-wide">
                景盛货运
              </div>
            </div>
            <p className="text-sm text-brand-400 leading-relaxed">
              {companyInfo.name}是一家专业货运物流企业，提供长途运输、城市配送、冷链物流、大件运输、仓储服务等综合物流解决方案。安全、高效、守时，全国直达。
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold mb-4 font-display uppercase tracking-wide text-sm border-b-2 border-accent-500 inline-block pb-1">
              服务项目
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm text-brand-400 hover:text-accent-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-accent-500">&rsaquo;</span>
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold mb-4 font-display uppercase tracking-wide text-sm border-b-2 border-accent-500 inline-block pb-1">
              快速导航
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              <Link href="/" className="text-sm text-brand-400 hover:text-accent-400 transition-colors flex items-center gap-2">
                <span className="text-accent-500">&rsaquo;</span>
                首页
              </Link>
              <Link href="/services" className="text-sm text-brand-400 hover:text-accent-400 transition-colors flex items-center gap-2">
                <span className="text-accent-500">&rsaquo;</span>
                服务项目
              </Link>
              <Link href="/about" className="text-sm text-brand-400 hover:text-accent-400 transition-colors flex items-center gap-2">
                <span className="text-accent-500">&rsaquo;</span>
                关于我们
              </Link>
              <Link href="/news" className="text-sm text-brand-400 hover:text-accent-400 transition-colors flex items-center gap-2">
                <span className="text-accent-500">&rsaquo;</span>
                新闻资讯
              </Link>
              <Link href="/contact" className="text-sm text-brand-400 hover:text-accent-400 transition-colors flex items-center gap-2">
                <span className="text-accent-500">&rsaquo;</span>
                联系我们
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold mb-4 font-display uppercase tracking-wide text-sm border-b-2 border-accent-500 inline-block pb-1">
              联系方式
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 text-sm text-brand-400 hover:text-accent-400 transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {companyInfo.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-brand-400">
                <svg className="w-4 h-4 flex-shrink-0 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {companyInfo.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-400">
                <svg className="w-4 h-4 flex-shrink-0 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                全天候调度服务
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-brand-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-brand-500">
              &copy; {new Date().getFullYear()} {companyInfo.name}. 保留所有权利.
            </p>
            <div className="flex items-center gap-4 text-sm text-brand-500">
              <Link href="/" className="hover:text-accent-400 transition-colors">
                首页
              </Link>
              <span className="text-brand-700">|</span>
              <Link href="/about" className="hover:text-accent-400 transition-colors">
                关于我们
              </Link>
              <span className="text-brand-700">|</span>
              <Link href="/contact" className="hover:text-accent-400 transition-colors">
                联系我们
              </Link>
              <span className="text-brand-700">|</span>
              <Link href="/sitemap.xml" className="hover:text-accent-400 transition-colors">
                网站地图
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2 text-xs text-brand-600">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-400 transition-colors"
            >
              {companyInfo.icp}
            </a>
            <span className="hidden md:inline text-brand-700">|</span>
            <span>
              技术支持：{" "}
              <a
                href="https://ra0.cn/wangzhan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-400 transition-colors"
              >
                青衣网络
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
