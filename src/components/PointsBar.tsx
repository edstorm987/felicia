"use client";

import { useEffect, useState, useCallback } from "react";
import { computeProgress, REWARDS, MAX_POINTS, recordClaim, getClaims, type ProgressInfo, type PointsReward, type ClaimRecord } from "@/lib/points";
import { useCart } from "@/context/CartContext";

interface Props {
  subtotal: number;
}

export default function PointsBar({ subtotal }: Props) {
  const { addItem, applyDiscount, discounts, removeItem, removeDiscount } = useCart();
  const [info, setInfo] = useState<ProgressInfo | null>(null);
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [tick, setTick] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [fragrancePick, setFragrancePick] = useState<Record<string, string>>({});

  useEffect(() => {
    setInfo(computeProgress(subtotal));
    setClaims(getClaims());
  }, [subtotal, tick]);

  const showToast = useCallback((kind: "ok" | "err", msg: string) => {
    setToast({ kind, msg });
    setTimeout(() => setToast(null), 2600);
  }, []);

  // Revoke any claim whose tier cost is no longer covered by projected
  // (= balance + pending). Claims don't spend points — they're just gated by
  // whether the cycle's running total still covers each tier.
  useEffect(() => {
    if (!info) return;
    const projected = info.projected;
    const all = getClaims();
    const stillValid = all.filter(c => c.cost <= projected);
    const revoked = all.filter(c => c.cost > projected);
    if (!revoked.length) return;
    try { localStorage.setItem("lk_points_claims_v1", JSON.stringify(stillValid)); } catch {}
    for (const c of revoked) {
      if (c.kind === "free_item" && c.itemId) removeItem(c.itemId);
      if (c.kind === "discount_code" && c.code) removeDiscount(c.code);
    }
    showToast("err", revoked.length === 1
      ? `${revoked[0].label} removed — your cart no longer covers it.`
      : `${revoked.length} rewards removed — your cart no longer covers them.`);
    setTick(t => t + 1);
  }, [info, removeItem, removeDiscount, showToast]);

  const claim = useCallback(async (r: PointsReward) => {
    if (busy) return;
    setBusy(r.id);
    try {
      if (getClaims().some(c => c.rewardId === r.id)) {
        showToast("err", "Already claimed in this order.");
        return;
      }
      const projected = info?.projected ?? 0;
      if (projected < r.cost) {
        showToast("err", "Not enough points yet.");
        return;
      }
      if (r.kind === "free_item" && r.item) {
        const variant = r.fragrances
          ? (fragrancePick[r.id] ?? r.fragrances[0])
          : r.item.variant;
        addItem({ id: r.item.id, name: r.item.name, price: 0, variant });
        recordClaim({ rewardId: r.id, cost: r.cost, label: r.label, kind: r.kind, itemId: r.item.id });
        showToast("ok", `Added "${r.item.name}"${variant ? ` — ${variant}` : ""} to your bag 💜`);
      } else if (r.kind === "discount_code" && r.code) {
        if (discounts.some(d => d.code === r.code)) {
          showToast("err", "20% off is already applied to this order.");
          return;
        }
        const res = await applyDiscount(r.code);
        if (!res.ok) { showToast("err", res.reason); return; }
        recordClaim({ rewardId: r.id, cost: r.cost, label: r.label, kind: r.kind, code: r.code });
        showToast("ok", "20% off applied — enjoy ✨");
      }
      setTick(t => t + 1);
    } finally {
      setBusy(null);
    }
  }, [addItem, applyDiscount, discounts, busy, info, showToast, fragrancePick]);

  if (!info) return null;

  const { balance, pending, projected, nextReward, pointsToNext, unlocked } = info;
  const sorted = [...REWARDS].sort((a, b) => a.cost - b.cost);
  const maxCost = sorted[sorted.length - 1].cost;
  const overallPercent = Math.min(100, (projected / maxCost) * 100);

  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl border border-brand-amber/30 bg-gradient-to-br from-[#fff5ec] via-white to-[#fce4f1] p-6 shadow-[0_8px_30px_-12px_rgba(180,80,140,0.25)]">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-amber/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-brand-orange/10 blur-3xl" />

      <div className="relative flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber/90 font-semibold">
            ✦ Luv Points
          </p>
          <h3 className="font-display text-2xl sm:text-[28px] leading-tight text-brand-purple-dark mt-1">
            {nextReward ? (
              <>
                You&apos;re{" "}
                <span className="text-brand-orange">{pointsToNext}</span>{" "}
                {pointsToNext === 1 ? "point" : "points"} from{" "}
                <span className="italic">{nextReward.short}</span>
              </>
            ) : (
              <>Maxed out at {MAX_POINTS} — claim the gift set to start a fresh cycle 💜</>
            )}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] tracking-[0.22em] uppercase text-brand-purple-dark/60">Your balance</p>
          <p className="text-brand-purple-dark">
            <span className="font-display text-2xl">{projected}</span>
            <span className="text-brand-purple-dark/60 text-xs"> / {MAX_POINTS}</span>
            <span className="text-brand-purple-dark/50 text-xs ml-1.5 block sm:inline">
              {balance}{pending > 0 ? ` + ${pending}` : ""}
            </span>
          </p>
        </div>
      </div>

      <div className="relative pt-1 pb-6">
        <div className="relative h-2.5 w-full rounded-full bg-white/70 border border-pink-200/60">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-amber via-brand-orange to-[#d65a8a] transition-all duration-700 ease-out"
            style={{ width: `${overallPercent}%` }}
          />
          {sorted.map((r) => {
            const left = (r.cost / maxCost) * 100;
            const isUnlocked = unlocked.some(u => u.id === r.id);
            return (
              <div key={r.id} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${left}%` }}>
                <div className={`h-4 w-4 rounded-full border-2 transition-colors ${
                  isUnlocked ? "bg-brand-amber border-white shadow-md shadow-brand-amber/40" : "bg-white border-pink-200"
                }`} />
                <span className={`absolute top-5 left-1/2 -translate-x-1/2 text-[9px] tracking-wider uppercase whitespace-nowrap ${
                  isUnlocked ? "text-brand-amber font-semibold" : "text-brand-purple-dark/50"
                }`}>{r.cost}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reward cards with claim buttons */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {sorted.map((r) => {
          const affordable = projected >= r.cost;
          const isNext = nextReward?.id === r.id;
          const isClaimed = claims.some(c => c.rewardId === r.id);
          const canClaim = affordable && !isClaimed;
          return (
            <div
              key={r.id}
              className={`flex flex-col gap-2 rounded-xl border px-3 py-2.5 transition-all ${
                affordable
                  ? "bg-white border-brand-amber/40 shadow-sm"
                  : isNext
                    ? "bg-white/70 border-brand-orange/30"
                    : "bg-white/40 border-pink-200/70"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={`text-sm leading-tight ${affordable ? "text-brand-purple-dark font-semibold" : "text-brand-purple-dark/70"}`}>
                    {affordable ? "✓ " : isNext ? "→ " : ""}{r.label}
                  </p>
                  <p className="text-[10px] tracking-wider uppercase text-brand-purple-dark/55 mt-0.5">
                    {r.cost} pts {isClaimed && "· claimed"}
                    {r.id === "free_set" && !isClaimed && " · surprise"}
                  </p>
                </div>
                <button
                  onClick={() => claim(r)}
                  disabled={!canClaim || busy === r.id}
                  className={`shrink-0 text-[11px] font-semibold tracking-wider uppercase px-3 py-2 rounded-full transition-all ${
                    canClaim
                      ? "bg-brand-orange text-white hover:bg-brand-purple-dark shadow-sm"
                      : "bg-pink-100 text-brand-purple-dark/40 cursor-not-allowed"
                  }`}
                >
                  {busy === r.id ? "…" : isClaimed ? "Claimed" : affordable ? "Claim" : "Locked"}
                </button>
              </div>
              {r.fragrances && !isClaimed && affordable && (
                <div className="flex items-center gap-2">
                  <label className="text-[9px] tracking-widest uppercase text-brand-purple-dark/60">Scent</label>
                  <select
                    value={fragrancePick[r.id] ?? r.fragrances[0]}
                    onChange={(e) => setFragrancePick(p => ({ ...p, [r.id]: e.target.value }))}
                    className="flex-1 bg-pink-50 border border-pink-200 rounded-md px-2 py-1 text-[11px] text-brand-purple-dark focus:outline-none focus:border-brand-amber/50"
                  >
                    {r.fragrances.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(pending > 0 || projected === 0) && (
        <p className="relative mt-3 text-[11px] text-brand-purple-dark/70">
          {projected === 0
            ? "Add items to start earning — every £1 spent = 1 Luv Point."
            : <>You&apos;ll earn <span className="font-semibold text-brand-amber">{pending}</span> {pending === 1 ? "point" : "points"} with this order. Points carry over between orders.</>}
        </p>
      )}

      {toast && (
        <div className={`relative mt-3 rounded-lg px-3 py-2 text-xs font-medium border ${
          toast.kind === "ok"
            ? "bg-brand-amber/10 border-brand-amber/40 text-brand-amber"
            : "bg-brand-orange/10 border-brand-orange/40 text-brand-orange"
        }`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
