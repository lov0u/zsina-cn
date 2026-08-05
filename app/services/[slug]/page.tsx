import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, companyInfo } from "@/lib/data";
import ServiceIcon from "@/components/ServiceIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return { title: "服务未找到" };
  }
  return {
    title: service.name,
    description: service.shortDesc,
    alternates: { canonical: `https://${companyInfo.domain}/services/${service.slug}/` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const otherServices = services.filter((_, i) => i !== currentIndex);

  return (
    <>
      {/* Hero with large image */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/70 to-brand-900/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div>
            <div className="safety-stripes-thin h-2 w-20 mb-4"></div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-accent-500 flex items-center justify-center text-brand-900">
                <ServiceIcon name={service.icon} className="w-7 h-7" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                {service.name}
              </h1>
            </div>
            <p className="text-brand-200 text-lg max-w-2xl">{service.shortDesc}</p>
          </div>
        </div>
      </section>

      {/* 面包屑 */}
      <div className="bg-brand-100 border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-brand-500">
            <Link href="/" className="hover:text-accent-600">首页</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-accent-600">服务项目</Link>
            <span>/</span>
            <span className="text-brand-900 font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* 详细描述 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="safety-stripes-thin h-1.5 w-16 mb-4"></div>
          <h2 className="text-3xl font-display font-bold text-brand-900 mb-6">
            服务介绍
          </h2>
          <p className="text-brand-600 leading-relaxed text-lg">
            {service.description}
          </p>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-16 bg-brand-50 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="safety-stripes-thin h-1.5 w-16 mx-auto mb-4"></div>
            <h2 className="text-3xl font-display font-bold text-brand-900">
              核心优势
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="industrial-card p-5 text-center"
              >
                <div className="w-12 h-12 bg-brand-800 text-accent-500 flex items-center justify-center mx-auto mb-3 font-display font-bold text-xl">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-brand-600 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务流程 */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="safety-stripes-thin h-1.5 w-16 mx-auto mb-4"></div>
            <p className="text-accent-600 font-display font-semibold uppercase tracking-widest text-sm mb-2">
              SERVICE PROCESS
            </p>
            <h2 className="text-3xl font-display font-bold text-brand-900">
              服务流程
            </h2>
          </div>
          <div className="relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-brand-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {service.process.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 w-16 h-16 mx-auto bg-accent-500 text-brand-900 flex items-center justify-center font-display font-bold text-2xl rounded-sm mb-4 border-4 border-white shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-brand-900 mb-2 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 优势列表 & 适用场景 */}
      <section className="py-16 bg-brand-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 优势列表 */}
            <div>
              <div className="safety-stripes-thin h-1.5 w-12 mb-4"></div>
              <h3 className="text-2xl font-display font-bold text-brand-900 mb-6">
                服务优势
              </h3>
              <div className="space-y-3">
                {service.advantages.map((adv, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white p-4 border-l-4 border-accent-500"
                  >
                    <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    <span className="text-sm text-brand-700">{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 适用场景 */}
            <div>
              <div className="safety-stripes-thin h-1.5 w-12 mb-4"></div>
              <h3 className="text-2xl font-display font-bold text-brand-900 mb-6">
                适用场景
              </h3>
              <div className="space-y-3">
                {service.scenes.map((scene, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-brand-800 text-white p-4"
                  >
                    <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="text-sm text-brand-200">{scene}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 其他服务 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-brand-900 mb-8 text-center">
            其他服务
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="industrial-card p-4 text-center card-hover group"
              >
                <div className="w-10 h-10 bg-brand-800 text-accent-500 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-500 group-hover:text-brand-900 transition-colors">
                  <ServiceIcon name={other.icon} className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-brand-900">{other.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-900/90"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="safety-stripes-thin h-2 w-24 mx-auto mb-6"></div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            需要{service.name}服务？
          </h2>
          <p className="text-brand-200 mb-8">
            联系我们，获取专业的物流运输方案和报价
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
