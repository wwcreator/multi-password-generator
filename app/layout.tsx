import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "密码生成器",
  description: "强大、安全、卓越的随机密码生成器"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-8NVSGLWNW8" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8NVSGLWNW8');`}
        </Script>
        {children}
      </body>
    </html>
  );
}