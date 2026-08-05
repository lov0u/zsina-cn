import Link from "next/link";
import type { Metadata } from "next";
import { services, companyInfo } from "@/lib/data";
import ServiceIcon from "@/components/ServiceIcon";

export const metadata: Metadata = {
  title: "服务项目",
  description: `${companyInfo.name}提供长途运输、城市配送、冷链物流、大件运输、仓储服务五大核心物流服务，全国直达，安全高效。`,
  alternates: { canonical: `https://${companyInfo.domain}/services/` },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80"
            alt="货运服务"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-brand-900/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="safety-stripes-thin h-2 w-24 mx-auto mb-4"></div>
          <p className="text-accent-500 font-display font-semibold uppercase tracking-widest text-sm mb-3">
            OUR SERVICES
          </p>
          <h1 className="text-5xl font-display font-bold text-white mb-4">
            服务项目
          </h1>
          <p className="text-brand-300 max-w-2xl mx-auto">
            五大核心物流服务，满足您全方位的货运需求
          </p>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center industrial-card overflow-hidden ${
                  index % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* 图片 */}
                <div className="aspect-[16/10] overflow-hidden bg-brand-100 [direction:ltr]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 内容 */}
                <div className="p-8 [direction:ltr]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-brand-800 flex items-center justify-center text-accent-500">
                      <ServiceIcon name={service.icon} className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-brand-900">
                        {service.name}
                      </h2>
                      <p className="text-xs text-accent-600 font-bold uppercase tracking-widest">
                        {service.slug.toUpperCase().replace(/-/g, " ")}
                      </p>
                    </div>
                  </div>

                  <p className="text-brand-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* 核心优势 */}
                  <div className="mb-6">
                    <p className="text-sm font-bold text-brand-900 mb-2 uppercase tracking-wide">
                      核心优势
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.slice(0, 4).map((feature, fi) => (
                        <div
                          key={fi}
                          className="flex items-start gap-2 text-sm text-brand-600"
                        >
                          <svg className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-800 text-white font-bold rounded-sm hover:bg-accent-500 hover:text-brand-900 transition-colors text-sm uppercase tracking-wide"
                  >
                    查看详情
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
