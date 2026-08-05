"use client";

import { useState } from "react";
import { companyInfo } from "@/lib/data";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `【网站咨询】${formData.name} - 货运物流服务咨询`
    );
    const body = encodeURIComponent(
      `姓名：${formData.name}\n邮箱：${formData.email}\n\n留言内容：\n${formData.message}`
    );
    window.location.href = `mailto:${companyInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-brand-900 p-8 shadow-2xl">
      <div className="safety-stripes-thin h-1.5 w-16 mb-6"></div>
      <h2 className="text-2xl font-display font-bold text-white mb-2">
        在线留言
      </h2>
      <p className="text-brand-400 text-sm mb-8">
        填写以下表单，我们将通过邮件与您联系
      </p>

      {submitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-accent-500 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-brand-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">感谢您的留言！</h3>
          <p className="text-brand-400 text-sm">
            您的邮件客户端已打开，请发送邮件完成咨询。
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", message: "" });
            }}
            className="mt-6 text-accent-500 font-bold text-sm uppercase tracking-wide hover:text-accent-400"
          >
            再次留言
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-white mb-2 uppercase tracking-wide"
            >
              姓名 <span className="text-accent-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-brand-800 border border-brand-700 text-white placeholder-brand-500 focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="请输入您的姓名"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-white mb-2 uppercase tracking-wide"
            >
              邮箱 <span className="text-accent-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-brand-800 border border-brand-700 text-white placeholder-brand-500 focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="请输入您的邮箱"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-bold text-white mb-2 uppercase tracking-wide"
            >
              留言 <span className="text-accent-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-brand-800 border border-brand-700 text-white placeholder-brand-500 focus:outline-none focus:border-accent-500 transition-colors resize-none"
              placeholder="请描述您的货运物流需求..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-accent-500 text-brand-900 font-bold uppercase tracking-wide hover:bg-accent-600 hover:text-white transition-colors"
          >
            发送留言
          </button>
        </form>
      )}
    </div>
  );
}
