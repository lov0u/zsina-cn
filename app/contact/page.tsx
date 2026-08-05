import type { Metadata } from "next";
import { companyInfo } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "联系我们",
  description: `联系${companyInfo.name}，获取专业货运物流服务。邮箱：${companyInfo.email}，地址：${companyInfo.address}。`,
  alternates: { canonical: `https://${companyInfo.domain}/contact/` },
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-20 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=1920&q=80"
            alt="联系我们"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-brand-900/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="safety-stripes-thin h-2 w-24 mx-auto mb-4"></div>
          <p className="text-accent-500 font-display font-semibold uppercase tracking-widest text-sm mb-3">
            CONTACT US
          </p>
          <h1 className="text-5xl font-display font-bold text-white">
            联系我们
          </h1>
        </div>
      </section>

      {/* 联系内容 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 左侧：联系信息 */}
            <div>
              <div className="safety-stripes-thin h-1.5 w-16 mb-4"></div>
              <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
                GET IN TOUCH
              </p>
              <h2 className="text-3xl font-display font-bold text-brand-900 mb-6">
                随时为您服务
              </h2>
              <p className="text-brand-600 leading-relaxed mb-8">
                如您有任何货运物流需求或疑问，欢迎通过邮件与我们联系。我们的专业团队将为您提供详细的咨询和量身定制的物流解决方案。
              </p>

              <div className="space-y-4">
                {/* 邮箱 */}
                <div className="flex items-start gap-4 bg-brand-50 p-5 border-l-4 border-accent-500">
                  <div className="w-12 h-12 bg-brand-800 flex items-center justify-center text-accent-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-accent-600 font-bold uppercase tracking-widest mb-1">
                      电子邮箱
                    </p>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-lg font-bold text-brand-900 hover:text-accent-600 transition-colors"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* 地址 */}
                <div className="flex items-start gap-4 bg-brand-50 p-5 border-l-4 border-accent-500">
                  <div className="w-12 h-12 bg-brand-800 flex items-center justify-center text-accent-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-accent-600 font-bold uppercase tracking-widest mb-1">
                      公司地址
                    </p>
                    <p className="text-lg font-bold text-brand-900">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>

                {/* 服务时间 */}
                <div className="flex items-start gap-4 bg-brand-50 p-5 border-l-4 border-accent-500">
                  <div className="w-12 h-12 bg-brand-800 flex items-center justify-center text-accent-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-accent-600 font-bold uppercase tracking-widest mb-1">
                      服务时间
                    </p>
                    <p className="text-lg font-bold text-brand-900">
                      全天候调度服务
                    </p>
                    <p className="text-sm text-brand-500">365天不间断运营</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：联系表单 */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
