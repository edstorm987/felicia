"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPurchaseOrder, type POLineItem } from "@/lib/admin/purchaseOrders";
import PluginRequired from "@/components/admin/PluginRequired";
import Link from "next/link";

export default function NewPurchaseOrderPage() {
  return <PluginRequired plugin="inventory" feature="purchaseOrders"><NewPurchaseOrderPageInner /></PluginRequired>;
}

function NewPurchaseOrderPageInner() {
  const router = useRouter();
  const [supplier, setSupplier] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<POLineItem[]>([
    { id: "1", name: "", quantity: 1, unitCost: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).slice(2), name: "", quantity: 1, unitCost: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof POLineItem, value: string | number) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier.trim()) {
      alert("Supplier is required.");
      return;
    }
    
    const validItems = items.filter(i => i.name.trim() !== "" && i.quantity > 0);
    if (validItems.length === 0) {
      alert("At least one valid item is required.");
      return;
    }

    createPurchaseOrder({
      supplier,
      status: "draft",
      items: validItems,
      notes
    });

    router.push("/admin/inventory/purchase-orders");
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/inventory/purchase-orders" className="text-brand-purple-dark/60 hover:text-brand-purple-dark">
          ← Back
        </Link>
        <span className="text-pink-200">|</span>
        <p className="text-[11px] tracking-[0.28em] uppercase text-brand-amber">New Purchase Order</p>
      </div>

      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-brand-purple-dark">Create Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-pink-200/50 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-semibold text-brand-purple-dark uppercase tracking-wider mb-2">
              Supplier Name
            </label>
            <input
              autoFocus
              value={supplier}
              onChange={e => setSupplier(e.target.value)}
              placeholder="e.g. Ghana Naturals Co."
              className="w-full bg-white border border-pink-200 rounded-lg px-4 py-2.5 text-sm text-brand-purple-dark focus:outline-none focus:border-brand-orange/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-purple-dark uppercase tracking-wider mb-2">
              Notes / Instructions
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Internal notes or delivery instructions..."
              className="w-full h-24 bg-white border border-pink-200 rounded-lg px-4 py-2.5 text-sm text-brand-purple-dark focus:outline-none focus:border-brand-orange/50 transition-colors resize-y"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-pink-200/50 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-brand-purple-dark">Line Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="text-sm font-medium text-brand-orange hover:text-brand-orange-light"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-4">
            <div className="hidden sm:grid grid-cols-[1fr_100px_120px_100px_40px] gap-3 text-[10px] uppercase tracking-wider text-brand-purple-dark/60 border-b border-pink-100 pb-2">
              <span>Item Description</span>
              <span>Quantity</span>
              <span>Unit Cost (£)</span>
              <span className="text-right">Line Total</span>
              <span></span>
            </div>

            {items.map((item, idx) => (
              <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_100px_120px_100px_40px] gap-3 items-center group">
                <input
                  value={item.name}
                  onChange={e => updateItem(item.id, "name", e.target.value)}
                  placeholder="Raw Shea Butter, Glass Jars..."
                  className="w-full bg-white border border-pink-200 rounded-lg px-3 py-2 text-sm text-brand-purple-dark focus:outline-none focus:border-brand-orange/50"
                />
                <input
                  type="number"
                  min="1"
                  value={item.quantity || ""}
                  onChange={e => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-pink-200 rounded-lg px-3 py-2 text-sm text-brand-purple-dark focus:outline-none focus:border-brand-orange/50"
                />
                <div className="relative w-full">
                  <span className="absolute left-3 top-2 text-sm text-brand-purple-dark/50">£</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitCost || ""}
                    onChange={e => updateItem(item.id, "unitCost", parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-pink-200 rounded-lg pl-7 pr-3 py-2 text-sm text-brand-purple-dark focus:outline-none focus:border-brand-orange/50"
                  />
                </div>
                <div className="w-full text-right text-sm font-medium text-brand-purple-dark sm:pt-2">
                  £{((item.quantity || 0) * (item.unitCost || 0)).toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="w-8 h-8 flex justify-center items-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-pink-100 flex justify-end">
            <div className="text-right">
              <span className="text-sm text-brand-purple-dark/60 uppercase tracking-widest mr-4">Total</span>
              <span className="text-2xl font-bold text-brand-purple-dark">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/inventory/purchase-orders"
            className="px-6 py-3 rounded-lg border border-pink-200 text-sm font-medium text-brand-purple-dark hover:bg-pink-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-brand-orange text-white text-sm font-semibold hover:bg-brand-orange-light shadow-lg shadow-brand-orange/20 transition-all"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
}
