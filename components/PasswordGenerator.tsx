"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { generateMemorable, generatePIN, generateRandom } from "@/utils/generator";

type TabKey = "random" | "memorable" | "pin";

export default function PasswordGenerator() {
  const [tab, setTab] = useState<TabKey>("random");
  const [length, setLength] = useState(20);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const disabledLength = tab === "pin";
  const showToggles = tab === "random";

  const clampLength = useCallback((n: number) => {
    if (tab === "random") return Math.min(64, Math.max(6, n));
    if (tab === "memorable") return Math.min(40, Math.max(8, n));
    return Math.min(12, Math.max(4, n)); // pin
  }, [tab]);

  const regenerate = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < Math.max(1, count); i++) {
      if (tab === "random") {
        list.push(generateRandom(length, { numbers: useNumbers, symbols: useSymbols }));
      } else if (tab === "memorable") {
        list.push(generateMemorable(length));
      } else {
        list.push(generatePIN(Math.min(12, Math.max(4, length))));
      }
    }
    setValue(list);
  }, [tab, length, useNumbers, useSymbols, count]);

  useEffect(() => {
    setLength(tab === "pin" ? 6 : tab === "memorable" ? 20 : 20);
  }, [tab]);

  useEffect(() => {
    regenerate();
  }, [tab, length, useNumbers, useSymbols, regenerate]);

  const tabs: { key: TabKey; label: string; icon: string }[] = useMemo(() => ([
    { key: "random", label: "随机", icon: "✖" },
    { key: "memorable", label: "容易记住", icon: "📍" },
    { key: "pin", label: "PIN", icon: "#" }
  ]), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.join("\n"));
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 w-full max-w-md">
      <div className="flex gap-2 mb-5">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition
              ${tab === t.key ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-slate-600 text-sm mb-2">自定义新密码</div>
          <div className="flex items-center gap-3">
            <span className="text-slate-600 text-sm w-10">字符</span>
            <input
              type="range"
              min={tab === "pin" ? 4 : tab === "random" ? 6 : 8}
              max={tab === "pin" ? 12 : tab === "random" ? 64 : 40}
              value={clampLength(length)}
              onChange={(e) => setLength(clampLength(parseInt(e.target.value)))}
              className="flex-1"
              disabled={disabledLength}
            />
            <span className="w-10 text-right text-slate-700">{clampLength(length)}</span>
          </div>
        </div>

        {showToggles && (
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="accent-blue-600"
              />
              <span>数字</span>
            </label>
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="accent-blue-600"
              />
              <span>符号</span>
            </label>
          </div>
        )}

        <div>
          <div className="flex items-center gap-3">
            <span className="text-slate-600 text-sm w-10">数量</span>
            <input
              type="number"
              min={1}
              step={1}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value || "1")))}
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2"
            />
          </div>

          <div className="text-slate-600 text-sm mb-2 mt-5">生成密码</div>
          <pre className="rounded-lg border border-slate-200 px-3 py-3 font-mono text-slate-800 select-all overflow-x-auto whitespace-pre-wrap">
{value.join("\n")}
          </pre>
        </div>

        <div className="flex gap-3">
          <button
            onClick={copy}
            className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          >
            复制密码
          </button>
          <button
            onClick={regenerate}
            className="flex-1 border border-blue-600 text-blue-600 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
          >
            刷新密码
          </button>
        </div>
      </div>
    </div>
  );
}