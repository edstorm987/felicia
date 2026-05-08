"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listPurchaseOrders, type PurchaseOrder, type POStatus } from "@/lib/admin/purchaseOrders";
import PluginRequired from "@/components/admin/PluginRequired";

export default function PurchaseOrdersPage() {
  return <PluginRequired plugin="inventory" feature="purchaseOrders"><PurchaseOrdersPageInner /></PluginRequired>;
}

function StatusPill({ status }: { status: POStatus }) {
  switch (status) {
    case "draft": return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-500">Draft</span>;
    case "ordered": return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-brand-amber/20 text-brand-amber">Ordered</span>;
    case "received": return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-green-100 text-green-700">Received</span>;
    case "cancelled": return <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-red-100 text-red-700">Cancelled</span>;
  }
}

function PurchaseOrdersPageInner() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    setOrders(listPurchaseOrders());
    const handler = () => setOrders(listPurchaseOrders());
    window.addEventListener("lk-admin-purchase-orders-change", handler);
    return () => window.removeEventListener("lk-admin-purchase-orders-change", handler);
  }, []);

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-brand-amber mb-2">Inventory</p>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-purple-dark">Purchase Orders</h1>
          <p className="text-brand-purple-dark/80 text-sm mt-1">
            {orders.length} orders
          </p>
        </div>
        <Link
          href="/admin/inventory/purchase-orders/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-lg hover:bg-brand-orange-light transition-colors"
        >
          <span>+</span> New Order
        </Link>
      </div>

      <div className="rounded-2xl border border-pink-200/50 bg-white overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-[120px_1fr_120px_120px_120px] gap-4 px-5 py-3 text-[10px] tracking-[0.22em] uppercase text-brand-purple-dark/80 border-b border-pink-200/50">
          <span>Order No.</span>
          <span>Supplier</span>
          <span>Date</span>
          <span>Status</span>
          <span className="text-right">Total</span>
        </div>
        <div className="divide-y divide-pink-100">
          {orders.length === 0 && (
            <p className="text-brand-purple-dark/80 text-sm py-8 text-center">No purchase orders found.</p>
          )}
          {orders.map(o => (
            <div key={o.id} className="px-5 py-4 flex flex-col gap-2 md:grid md:grid-cols-[120px_1fr_120px_120px_120px] md:gap-4 md:items-center">
              <span className="text-sm font-mono text-brand-purple-dark">{o.id}</span>
              <div className="min-w-0">
                <p className="text-sm text-brand-purple-dark font-medium truncate">{o.supplier}</p>
                <p className="text-xs text-brand-purple-dark/60 truncate">{o.items.length} items</p>
              </div>
              <span className="text-xs text-brand-purple-dark/80">{new Date(o.date).toLocaleDateString()}</span>
              <div>
                <StatusPill status={o.status} />
              </div>
              <span className="text-sm font-medium text-brand-purple-dark md:text-right">£{o.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
