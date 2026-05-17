// Lightweight client-side loyalty points.
//
// Earn rate: 1 point per £1 of order subtotal (floored). Balance lives in
// localStorage; prior orders accumulate. Tiers below define spendable rewards
// — the cart shows progress to the next one.

const BALANCE_KEY = "lk_points_balance_v1";
const LEDGER_KEY = "lk_points_ledger_v1";
const CLAIMS_KEY = "lk_points_claims_v1";
const POINTS_PER_GBP = 1;
// Points accumulate up to this cap. The top-tier reward (gift set) costs the
// full cap and is worth ~£150 of stock, so the cycle resets every £150 spent.
export const MAX_POINTS = 150;

export type RewardKind = "free_item" | "discount_code";

export interface PointsReward {
  id: string;
  cost: number;
  label: string;
  short: string;
  kind: RewardKind;
  item?: { id: string; name: string; variant?: string };
  code?: string;
  // Optional fragrance choices the customer picks before claiming. When
  // present, the chosen fragrance becomes the cart-line variant.
  fragrances?: string[];
}

const STANDARD_FRAGRANCES = ["Wild Orange", "Lavender", "Frankincense", "Unscented"];

export const REWARDS: PointsReward[] = [
  {
    id: "free_tester", cost: 25, label: "Free tester bar", short: "a free tester bar",
    kind: "free_item",
    item: { id: "reward:free_tester", name: "Free Tester Bar" },
    fragrances: STANDARD_FRAGRANCES,
  },
  {
    id: "twenty_off", cost: 50, label: "20% off order", short: "20% off your order",
    kind: "discount_code", code: "LUV20",
  },
  {
    id: "free_jar", cost: 100, label: "Free jar", short: "a free jar",
    kind: "free_item",
    item: { id: "reward:free_jar", name: "Free Odo Jar" },
    fragrances: STANDARD_FRAGRANCES,
  },
  {
    id: "free_set", cost: 150, label: "Free gift set", short: "a free gift set",
    kind: "free_item",
    item: { id: "reward:free_set", name: "Free Luv & Ker Gift Set — surprise pick 🎁", variant: "Felicia's choice" },
  },
];

export interface LedgerEntry {
  ts: number;
  delta: number;
  reason: string;
}

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function getBalance(): number {
  return safeRead<number>(BALANCE_KEY, 0) || 0;
}

export function getLedger(): LedgerEntry[] {
  const v = safeRead<LedgerEntry[]>(LEDGER_KEY, []);
  return Array.isArray(v) ? v : [];
}

function setBalance(n: number) { safeWrite(BALANCE_KEY, Math.min(MAX_POINTS, Math.max(0, Math.floor(n)))); }

export function addPoints(delta: number, reason: string): number {
  const prev = getBalance();
  const next = Math.min(MAX_POINTS, Math.max(0, prev + Math.floor(delta)));
  setBalance(next);
  const ledger = getLedger();
  ledger.push({ ts: Date.now(), delta: next - prev, reason });
  safeWrite(LEDGER_KEY, ledger.slice(-50));
  return next;
}

export function resetBalance(reason = "cycle-reset") {
  const prev = getBalance();
  setBalance(0);
  const ledger = getLedger();
  ledger.push({ ts: Date.now(), delta: -prev, reason });
  safeWrite(LEDGER_KEY, ledger.slice(-50));
}

export interface ClaimRecord {
  rewardId: string;
  cost: number;
  label: string;
  kind: RewardKind;
  itemId?: string;
  code?: string;
  ts: number;
}

export function getClaims(): ClaimRecord[] {
  const v = safeRead<ClaimRecord[]>(CLAIMS_KEY, []);
  return Array.isArray(v) ? v : [];
}

export function recordClaim(c: Omit<ClaimRecord, "ts">) {
  const all = getClaims();
  all.push({ ...c, ts: Date.now() });
  safeWrite(CLAIMS_KEY, all);
}

export function popClaim(): ClaimRecord | null {
  const all = getClaims();
  if (!all.length) return null;
  const last = all.pop()!;
  safeWrite(CLAIMS_KEY, all);
  return last;
}

export function clearClaims() { safeWrite(CLAIMS_KEY, []); }

export function pointsFromSubtotal(subtotal: number): number {
  return Math.max(0, Math.floor(subtotal * POINTS_PER_GBP));
}

export interface ProgressInfo {
  balance: number;
  pending: number;
  projected: number;
  nextReward: PointsReward | null;
  pointsToNext: number;
  unlocked: PointsReward[];
  percent: number;
  maxedOut: boolean;
}

export function computeProgress(subtotal: number): ProgressInfo {
  const balance = getBalance();
  const rawPending = pointsFromSubtotal(subtotal);
  // Pending is capped so the displayed projected total can't exceed MAX_POINTS
  // when balance >= 0. (Balance can dip negative from in-cart claims, in which
  // case pending fills the gap up to MAX_POINTS.)
  const headroom = MAX_POINTS - Math.max(0, balance);
  const pending = Math.max(0, Math.min(rawPending, headroom));
  const projected = balance + pending;
  const sorted = [...REWARDS].sort((a, b) => a.cost - b.cost);
  const unlocked = sorted.filter(r => projected >= r.cost);
  const nextReward = sorted.find(r => projected < r.cost) ?? null;
  const prevCost = unlocked.length ? unlocked[unlocked.length - 1].cost : 0;
  const pointsToNext = nextReward ? nextReward.cost - projected : 0;
  const span = nextReward ? nextReward.cost - prevCost : 1;
  const into = projected - prevCost;
  const percent = nextReward ? Math.min(100, Math.max(0, (into / span) * 100)) : 100;
  return { balance, pending, projected, nextReward, pointsToNext, unlocked, percent, maxedOut: projected >= MAX_POINTS };
}
