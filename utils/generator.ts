const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUM = "0123456789";
const SYM = "!@#$%^&*()-_=+[]{};:,.?/";

export function generateRandom(len: number, opts: { numbers: boolean; symbols: boolean }) {
  const pool = LOWER + UPPER + (opts.numbers ? NUM : "") + (opts.symbols ? SYM : "");
  if (pool.length === 0) return "";
  let out = "";
  const arr = new Uint32Array(len);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) {
    const idx = arr[i] % pool.length;
    out += pool[idx];
  }
  return out;
}

// 简易易记密码：单词-单词-数字
const WORDS = [
  "alpha","bravo","cherry","delta","eagle","flame","giant","happy","island","jelly",
  "kiwi","lemon","mango","noble","olive","panda","quantum","rain","sun","tiger",
  "ultra","violet","wind","xenon","young","zebra"
];

export function generateMemorable(targetLen: number) {
  const rand = (n: number) => Math.floor((crypto as any)?.getRandomValues ? (crypto as any).getRandomValues(new Uint32Array(1))[0] % n : Math.random() * n);
  let parts: string[] = [];
  while (parts.join("-").length < targetLen) {
    const w = WORDS[rand(WORDS.length)];
    parts.push(Math.random() < 0.3 ? capitalize(w) : w);
    if (parts.join("-").length + 2 <= targetLen && Math.random() < 0.4) {
      parts.push(String(rand(90) + 10));
    }
  }
  let out = parts.join("-");
  if (out.length > targetLen) out = out.slice(0, targetLen);
  return out;
}

export function generatePIN(len: number) {
  let out = "";
  const arr = new Uint32Array(len);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) {
    out += String(arr[i] % 10);
  }
  return out;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}