"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { companyInfo } from "@/lib/data";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/services", label: "服务项目" },
  { href: "/about", label: "关于我们" },
  { href: "/news", label: "新闻资讯" },
  { href: "/contact", label: "联系我们" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* 顶部深灰条 */}
      <div className="metal-gradient text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              安全 · 高效 · 守时
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {companyInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* 安全条纹 */}
      <div className="safety-stripes-thin h-1"></div>

      {/* 主导航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 bg-brand-800 flex items-center justify-center text-accent-500 font-display font-bold text-xl border-l-4 border-accent-500">
              景
            </div>
            <div>
              <div className="text-lg font-bold text-brand-900 font-display tracking-wide">
                景盛货运
              </div>
              <div className="text-xs text-brand-500 hidden sm:block uppercase tracking-widest">
                JINGSHENG FREIGHT
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors border-b-2 ${
                    isActive
                      ? "text-accent-600 border-accent-500"
                      : "text-brand-700 border-transparent hover:text-accent-600 hover:border-accent-500"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Email CTA */}
          <a
            href={`mailto:${companyInfo.email}`}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-accent-500 text-brand-900 font-bold rounded-sm hover:bg-accent-600 hover:text-white transition-colors text-sm uppercase tracking-wide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            联系我们
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-sm hover:bg-brand-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            <svg className="w-6 h-6 text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden py-4 border-t-2 border-accent-500 bg-white animate-fade-in">
          <div className="flex flex-col gap-1 px-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors border-l-4 ${
                    isActive
                      ? "text-accent-600 bg-accent-50 border-accent-500"
                      : "text-brand-700 border-transparent hover:text-accent-600 hover:bg-brand-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={`mailto:${companyInfo.email}`}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-accent-500 text-brand-900 font-bold rounded-sm"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {companyInfo.email}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
