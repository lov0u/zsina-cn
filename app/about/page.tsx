import Link from "next/link";
import type { Metadata } from "next";
import { companyInfo, milestones, fleet, qualifications } from "@/lib/data";

export const metadata: Metadata = {
  title: "关于我们",
  description: `${companyInfo.name}成立于2010年，专业货运物流企业，提供长途运输、城市配送、冷链物流、大件运输、仓储服务等综合物流解决方案。`,
  alternates: { canonical: `https://${companyInfo.domain}/about/` },
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1920&q=80"
            alt="物流仓库"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-brand-900/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="safety-stripes-thin h-2 w-24 mx-auto mb-4"></div>
          <p className="text-accent-500 font-display font-semibold uppercase tracking-widest text-sm mb-3">
            ABOUT JINGSHENG
          </p>
          <h1 className="text-5xl font-display font-bold text-white">
            关于我们
          </h1>
        </div>
      </section>

      {/* 公司介绍 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=800&q=80"
                alt="景盛货运物流中心"
                className="w-full h-96 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 safety-stripes h-4 w-full"></div>
            </div>
            <div>
              <div className="safety-stripes-thin h-1.5 w-16 mb-4"></div>
              <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
                COMPANY PROFILE
              </p>
              <h2 className="text-3xl font-display font-bold text-brand-900 mb-6">
                景盛货运 简介
              </h2>
              <div className="space-y-4 text-brand-600 leading-relaxed">
                <p>
                  {companyInfo.name}成立于2010年，总部位于烟台，是一家专业从事货运物流的企业。经过十余年的稳健发展，公司已从最初的短途运输发展为覆盖全国的综合物流服务商。
                </p>
                <p>
                  公司业务涵盖长途运输、城市配送、冷链物流、大件运输、仓储服务五大核心板块，拥有各类专业运输车辆百余台，配备GPS卫星定位系统和智能调度平台，业务覆盖全国各省市区。
                </p>
                <p>
                  我们始终坚持"安全、高效、守时"的服务理念，以客户需求为导向，以安全运输为底线，以准时交付为目标。十余年来，累计服务客户超过500家，年运量突破50万吨，赢得了广大客户的信赖和好评。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-20 bg-brand-50 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="safety-stripes-thin h-1.5 w-16 mx-auto mb-4"></div>
            <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
              OUR HISTORY
            </p>
            <h2 className="text-4xl font-display font-bold text-brand-900">
              发展历程
            </h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* 竖线 */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-300 md:-translate-x-1/2"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 mb-10 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 节点 */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent-500 border-4 border-white rounded-full md:-translate-x-1/2 z-10 mt-2"></div>

                {/* 年份 */}
                <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:text-right md:pr-8"}`}>
                  <div className="font-display font-bold text-5xl text-brand-300">
                    {milestone.year}
                  </div>
                </div>

                {/* 内容 */}
                <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="md:hidden font-display font-bold text-3xl text-accent-500 mb-2">
                    {milestone.year}
                  </div>
                  <div className="industrial-card p-5">
                    <h3 className="text-lg font-bold text-brand-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-brand-500 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 车队展示 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="safety-stripes-thin h-1.5 w-16 mx-auto mb-4"></div>
            <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
              OUR FLEET
            </p>
            <h2 className="text-4xl font-display font-bold text-brand-900">
              车队展示
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleet.map((vehicle, index) => (
              <div key={index} className="industrial-card overflow-hidden card-hover group">
                <div className="aspect-video overflow-hidden bg-brand-100">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-900 mb-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-accent-600 font-bold uppercase tracking-wide mb-2">
                    {vehicle.spec}
                  </p>
                  <p className="text-sm text-brand-500">{vehicle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 资质荣誉 */}
      <section className="py-20 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="safety-stripes-thin h-1.5 w-16 mx-auto mb-4"></div>
            <p className="text-accent-500 font-display font-semibold uppercase tracking-widest text-sm mb-2">
              QUALIFICATIONS
            </p>
            <h2 className="text-4xl font-display font-bold text-white">
              资质荣誉
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {qualifications.map((qual, index) => (
              <div
                key={index}
                className="border-l-4 border-accent-500 bg-brand-800 p-5 hover:bg-brand-700 transition-colors"
              >
                <div className="w-12 h-12 bg-accent-500/20 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">
                  {qual.title}
                </h3>
                <p className="text-xs text-brand-400 leading-relaxed">
                  {qual.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-brand-900 mb-4">
            携手景盛货运，共创高效物流
          </h2>
          <p className="text-brand-800 mb-8">
            专业团队为您提供量身定制的物流运输方案
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-900 text-white font-bold rounded-sm hover:bg-brand-800 transition-colors uppercase tracking-wide"
          >
            立即联系
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
