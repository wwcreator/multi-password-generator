import PasswordGenerator from "@/components/PasswordGenerator";

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
              <div className="space-y-[0.5em]">
                <span className="block whitespace-nowrap">简单。随机。随心可用</span>
                <span className="block whitespace-nowrap">试试我们的随机密码</span>
                <span className="block whitespace-nowrap">生成器 ！</span>
              </div>
            </h1>
            <p className="mt-6 text-slate-200 text-lg">
              简单好用的密码生成器，为您的密码安全提供保障！
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PasswordGenerator />
          </div>
        </div>
      </div>
    </main>
  );
}