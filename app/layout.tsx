import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "密码生成器",
  description: "强大、安全、卓越的随机密码生成器"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}