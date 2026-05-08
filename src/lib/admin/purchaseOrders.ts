"use client";

// Purchase Orders store. LocalStorage-backed scaffold.

const STORAGE_KEY = "lk_admin_purchase_orders_v1";
const CHANGE_EVENT = "lk-admin-purchase-orders-change";

export type POStatus = "draft" | "ordered" | "received" | "cancelled";

export interface POLineItem {
  id: string;
  name: string;      // e.g., "Glass Jars 100ml" or "Raw Shea Butter"
  sku?: string;      // Optional link to actual inventory item
  quantity: number;
  unitCost: number;
}

export interface PurchaseOrder {
  id: string;        // e.g. "PO-1001"
  supplier: string;  // e.g. "EcoPackaging Ltd"
  status: POStatus;
  date: number;      // Unix timestamp
  items: POLineItem[];
  total: number;
  notes?: string;
}

interface Store { [id: string]: PurchaseOrder; }

function read(): Store {
  if (typeof window === "undefined") return seedIfEmpty({});
  try { return seedIfEmpty(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Store); }
  catch { return seedIfEmpty({}); }
}

function write(s: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function seedIfEmpty(s: Store): Store {
  if (Object.keys(s).length > 0) return s;
  
  const now = Date.now();
  const seed: PurchaseOrder[] = [
    {
      id: "PO-1001",
      supplier: "Ghana Naturals Co.",
      status: "received",
      date: now - 15 * 86400000,
      items: [
        { id: "1", name: "Raw Shea Butter (10kg)", quantity: 2, unitCost: 150 },
        { id: "2", name: "Unrefined Cocoa Butter (5kg)", quantity: 1, unitCost: 85 }
      ],
      total: 385,
      notes: "Received in good condition."
    },
    {
      id: "PO-1002",
      supplier: "EcoPackaging Ltd",
      status: "ordered",
      date: now - 3 * 86400000,
      items: [
        { id: "3", name: "100ml Glass Jars w/ Lids", quantity: 500, unitCost: 0.80 },
        { id: "4", name: "Recycled Shipping Boxes (Small)", quantity: 200, unitCost: 0.45 }
      ],
      total: 490,
      notes: "Expected delivery next week."
    }
  ];
  
  const next: Store = {};
  seed.forEach(po => { next[po.id] = po; });
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function listPurchaseOrders(): PurchaseOrder[] {
  return Object.values(read()).sort((a, b) => b.date - a.date);
}

export function getPurchaseOrder(id: string): PurchaseOrder | null {
  return read()[id] ?? null;
}

export function createPurchaseOrder(po: Omit<PurchaseOrder, "id" | "date" | "total">) {
  const s = read();
  const id = `PO-${1000 + Object.keys(s).length + 1}`;
  const total = po.items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  
  const newPO: PurchaseOrder = {
    ...po,
    id,
    date: Date.now(),
    total
  };
  
  s[id] = newPO;
  write(s);
  return newPO;
}

export function updatePurchaseOrderStatus(id: string, status: POStatus) {
  const s = read();
  if (!s[id]) return;
  s[id].status = status;
  // Note: if status changes to 'received' and items match real SKUs,
  // we could optionally call adjustStock() from inventory.ts here.
  write(s);
}
