import Link from "next/link";
import { companyInfo } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-brand-50">
      <div className="text-center max-w-md">
        <div className="safety-stripes-thin h-3 w-32 mx-auto mb-8"></div>
        <div className="text-9xl font-display font-bold text-brand-800 mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-brand-900 mb-4">
          页面未找到
        </h1>
        <p className="text-brand-500 mb-8">
          您访问的页面可能已被移除或暂时不可用。如需货运物流服务，请通过邮件联系我们。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
          <a
            href={`mailto:${companyInfo.email}`}
            className="btn-outline"
          >
            邮件咨询
          </a>
        </div>
        <div className="safety-stripes-thin h-3 w-32 mx-auto mt-8"></div>
      </div>
    </div>
  );
}
