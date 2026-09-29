"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getProduct, hasDirectPrice } from "@/config/products";

const STORAGE_KEY = "moka:cart:v1";
const MAX_QTY = 20;

const CartContext = createContext(null);

function isValidItem(i) {
  return i && typeof i.id === "string" && Number.isInteger(i.qty) && i.qty > 0 && i.qty <= MAX_QTY;
}

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const exists = state.some((i) => i.id === action.id);
      if (!exists) return [...state, { id: action.id, qty: 1 }];
      return state.map((i) => (i.id === action.id ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i));
    }
    case "decrement":
      return state.flatMap((i) => (i.id !== action.id ? [i] : i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []));
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("cart"); // "cart" | "checkout" | "sent"
  const [addSignal, setAddSignal] = useState(0); // cambia en cada "agregar" → microanimación

  // Cargar carrito guardado
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed.filter(isValidItem) });
    } catch {
      /* almacenamiento no disponible: el carrito funciona igual en memoria */
    }
    setHydrated(true);
  }, []);

  // Guardar en cada cambio
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  // Sincronizar entre pestañas
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : [];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed.filter(isValidItem) });
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Precios siempre desde la configuración central (si cambias un precio, el carrito se actualiza)
  const lines = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProduct(i.id);
          if (!product || !product.active) return null;
          const unitPrice = hasDirectPrice(product) ? product.directPrice : null;
          return { ...i, product, name: product.name, unitPrice, lineTotal: unitPrice != null ? unitPrice * i.qty : null };
        })
        .filter(Boolean),
    [items]
  );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + (l.lineTotal ?? 0), 0);
  const hasUnpriced = lines.some((l) => l.unitPrice == null);

  const add = useCallback((id) => {
    dispatch({ type: "add", id });
    setAddSignal((s) => s + 1);
  }, []);
  const decrement = useCallback((id) => dispatch({ type: "decrement", id }), []);
  const remove = useCallback((id) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const qtyOf = useCallback((id) => items.find((i) => i.id === id)?.qty ?? 0, [items]);

  const openCart = useCallback((s = "cart") => {
    setStep(s);
    setIsOpen(true);
  }, []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = {
    hydrated,
    lines,
    count,
    subtotal,
    hasUnpriced,
    add,
    decrement,
    remove,
    clear,
    qtyOf,
    isOpen,
    step,
    setStep,
    openCart,
    closeCart,
    addSignal,
    maxQty: MAX_QTY,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
