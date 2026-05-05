"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrder, setOrderStatus, type Order, type OrderStatus } from "@/lib/admin/orders";
import { createLabel, printLabel, type Carrier } from "@/lib/admin/labels";
import { listAllSources, getAffiliate } from "@/lib/admin/marketing";
import { StatusPill } from "../../page";

const CARRIERS: Carrier[] = ["Royal Mail", "Evri", "DPD", "UPS"];

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [order, setOrder] = useState<Order | null>(null);
  const [carrier, setCarrier] = useState<Carrier>("Royal Mail");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setOrder(getOrder(id));
  }, [id]);

  if (!id) return <div className="p-8">Missing order id.</div>;
  if (!order) return <div className="p-8 text-brand-purple-dark/80 text-sm">Loading order…</div>;

  function refresh() {
    if (id) setOrder(getOrder(id));
  }

  function changeStatus(s: OrderStatus) {
    if (!id) return;
    setOrderStatus(id, s);
    refresh();
  }

  async function generateLabel() {
    if (!id) return;
    setBusy(true); setError(null);
    const result = await createLabel(id, { carrier });
    setBusy(false);
    if ("ok" in result && result.ok === false) {
      setError(result.error);
      return;
    }
    refresh();
    if ("labelUrl" in result) printLabel(result.labelUrl);
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/orders" className="text-xs text-brand-purple-dark/80 hover:text-brand-purple-dark">← All orders</Link>
        <Link
          href={`/admin/orders/${order.id}/receipt`}
          target="_blank"
          className="text-xs px-3 py-1.5 rounded-lg border border-white/15 text-brand-purple-dark/80 hover:text-brand-purple-dark hover:border-white/30"
        >
          Receipt / Invoice →
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-brand-amber mb-2">Order</p>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-purple-dark font-mono">{order.id}</h1>
          <p className="text-brand-purple-dark/80 text-sm mt-1">
            Placed {new Date(order.createdAt).toLocaleString()} ·
            <span className="ml-2"><StatusPill status={order.status} /></span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["pending", "paid", "fulfilled", "refunded", "cancelled"] as OrderStatus[]).map(s => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              className={`text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-colors ${
                order.status === s
                  ? "bg-brand-orange/20 border-brand-orange/40 text-brand-purple-dark"
                  : "border-pink-200 text-brand-purple-dark/80 hover:text-brand-purple-dark hover:border-white/30"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Items */}
        <section className="lg:col-span-2 rounded-2xl border border-white/8 bg-white p-5 sm:p-6">
          <h2 className="text-sm tracking-wide text-brand-purple-dark/80 mb-4">Items</h2>
          <div className="space-y-3">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-brand-purple-dark truncate">{it.name}</p>
                  <p className="text-[11px] text-brand-purple-dark/80">{it.productId} · qty {it.quantity}</p>
                </div>
                <span className="text-sm text-brand-purple-dark shrink-0">£{(it.unitPrice * it.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-pink-200/50 mt-5 pt-4 space-y-1.5 text-sm">
            <Row label="Subtotal" value={`£${order.subtotal.toFixed(2)}`} />
            {order.discount > 0 && <Row label="Discount" value={`−£${order.discount.toFixed(2)}`} accent />}
            <Row label="Shipping" value={`£${order.shipping.toFixed(2)}`} />
            {order.tax > 0 && <Row label="Tax" value={`£${order.tax.toFixed(2)}`} />}
            <Row label="Total" value={`£${order.total.toFixed(2)}`} bold />
          </div>
        </section>

        {/* Right column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Customer */}
          <section className="rounded-2xl border border-white/8 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h2 className="text-sm tracking-wide text-brand-purple-dark/80">Customer</h2>
              {order.customerEmail && (
                <Link
                  href={`/admin/customers/${encodeURIComponent(order.customerEmail)}`}
                  className="text-[11px] text-cyan-300/80 hover:text-cyan-200 shrink-0"
                >
                  View profile →
                </Link>
              )}
            </div>
            <p className="text-sm text-brand-purple-dark">{order.customerName}</p>
            <p className="text-xs text-brand-purple-dark/80 break-all">{order.customerEmail}</p>
            {order.shippingAddress && (
              <div className="mt-4 pt-4 border-t border-pink-200/50 text-xs text-brand-purple-dark/80 leading-relaxed">
                <p className="text-brand-purple-dark">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                <p>{order.shippingAddress.city} {order.shippingAddress.postcode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            )}
          </section>

          {/* Shipping label */}
          <section className="rounded-2xl border border-white/8 bg-white p-5 sm:p-6">
            <h2 className="text-sm tracking-wide text-brand-purple-dark/80 mb-3">Shipping label</h2>
            {order.tracking ? (
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-brand-purple-dark/80">Tracking</p>
                  <p className="text-sm text-brand-purple-dark font-mono">{order.tracking.code}</p>
                  <p className="text-[11px] text-brand-purple-dark/80">{order.tracking.carrier}{order.tracking.printedAt ? ` · printed ${new Date(order.tracking.printedAt).toLocaleDateString()}` : ""}</p>
                </div>
                {order.tracking.labelUrl && (
                  <button
                    onClick={() => order.tracking?.labelUrl && printLabel(order.tracking.labelUrl)}
                    className="w-full py-2.5 rounded-lg border border-pink-200 hover:border-white/30 text-xs text-brand-purple-dark transition-colors"
                  >
                    Reprint label
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <select
                  value={carrier}
                  onChange={e => setCarrier(e.target.value as Carrier)}
                  className="w-full bg-pink-50 border border-pink-200 rounded-lg px-3 py-2 text-sm text-brand-purple-dark"
                >
                  {CARRIERS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button
                  onClick={generateLabel}
                  disabled={busy || !order.shippingAddress}
                  className="w-full py-2.5 rounded-lg bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-semibold disabled:opacity-40"
                >
                  {busy ? "Generating…" : "Generate &amp; print label"}
                </button>
                {!order.shippingAddress && (
                  <p className="text-[11px] text-brand-purple-dark/80">Add a shipping address before printing.</p>
                )}
                {error && <p className="text-[11px] text-brand-orange">{error}</p>}
              </div>
            )}
          </section>

          {/* Attribution */}
          {(order.source || order.discountCode || order.affiliateId) && <AttributionCard order={order} />}

          {/* Payment */}
          <section className="rounded-2xl border border-white/8 bg-white p-5 sm:p-6">
            <h2 className="text-sm tracking-wide text-brand-purple-dark/80 mb-3">Payment</h2>
            {order.paymentIntent ? (
              <p className="text-xs text-brand-purple-dark/80 break-all font-mono">{order.paymentIntent}</p>
            ) : (
              <p className="text-xs text-brand-purple-dark/80">Demo order — no Stripe payment intent attached.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={accent ? "text-brand-amber" : "text-brand-purple-dark/80"}>{label}</span>
      <span className={`${bold ? "text-brand-purple-dark font-semibold" : "text-brand-purple-dark/80"} ${accent ? "text-brand-amber" : ""}`}>{value}</span>
    </div>
  );
}

function AttributionCard({ order }: { order: Order }) {
  const sourceLabel = order.source ? (listAllSources().find(s => s.id === order.source)?.label ?? order.source) : null;
  const aff = order.affiliateId ? getAffiliate(order.affiliateId) : undefined;
  return (
    <section className="rounded-2xl border border-white/8 bg-white p-5 sm:p-6">
      <h2 className="text-sm tracking-wide text-brand-purple-dark/80 mb-3">Attribution</h2>
      <div className="space-y-2 text-xs">
        {sourceLabel && (
          <div className="flex justify-between gap-3">
            <span className="text-brand-purple-dark/80">Source</span>
            <span className="text-brand-purple-dark text-right">{sourceLabel}{order.sourceDetail ? <span className="block text-brand-purple-dark/80 text-[11px]">{order.sourceDetail}</span> : null}</span>
          </div>
        )}
        {order.discountCode && (
          <div className="flex justify-between gap-3">
            <span className="text-brand-purple-dark/80">Discount</span>
            <span className="font-mono text-brand-amber">{order.discountCode}</span>
          </div>
        )}
        {aff && (
          <div className="flex justify-between gap-3">
            <span className="text-brand-purple-dark/80">Affiliate</span>
            <span className="text-brand-purple-dark text-right">{aff.name} <span className="block text-[11px] text-brand-purple-dark/80">{aff.commissionPct}% · £{(order.subtotal * aff.commissionPct / 100).toFixed(2)} earned</span></span>
          </div>
        )}
      </div>
      <Link href="/admin/marketing" className="block mt-4 text-[11px] text-brand-purple-dark/80 hover:text-brand-purple-dark">Manage marketing →</Link>
    </section>
  );
}
