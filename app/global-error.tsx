"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "#ffffff",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "420px" }}>
            <div
              style={{
                fontSize: "56px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              出错了
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              页面加载出现异常
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}
            >
              客户端出现了一个异常，请刷新页面重试。如果问题持续存在，请联系网站管理员。
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 28px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#ffffff",
                background: "#111827",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              刷新页面
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
