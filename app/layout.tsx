import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${companyInfo.domain}`),
  title: {
    default: `${companyInfo.name} - 专业货运物流 | 长途运输 冷链物流 大件运输`,
    template: `%s | ${companyInfo.name}`,
  },
  description: companyInfo.description,
  keywords: companyInfo.keywords.split(","),
  authors: [{ name: companyInfo.name }],
  creator: companyInfo.name,
  publisher: companyInfo.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: `https://${companyInfo.domain}`,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `https://${companyInfo.domain}`,
    title: `${companyInfo.name} - 专业货运物流`,
    description: companyInfo.description,
    siteName: companyInfo.name,
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: companyInfo.name,
              description: companyInfo.description,
              email: companyInfo.email,
              url: `https://${companyInfo.domain}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: companyInfo.address,
                addressCountry: "CN",
              },
              areaServed: "全国",
              knowsAbout:
                "长途运输,城市配送,冷链物流,大件运输,仓储服务",
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
