import { site } from "@/config/site";
import { money } from "./format";

export function whatsappUrl(text) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Arma el mensaje del pedido.
 * lines: [{ qty, name, lineTotal (number | null) }]
 */
export function buildOrderMessage({ lines, subtotal, hasUnpriced, customer, paymentLabel }) {
  const out = ["Hola, quiero hacer un pedido en MOKA ☕", ""];

  for (const l of lines) {
    const price = l.lineTotal != null ? money(l.lineTotal) : "precio por confirmar";
    out.push(`• ${l.qty} × ${l.name} — ${price}`);
  }

  let subtotalText = money(subtotal);
  if (hasUnpriced) subtotalText = subtotal > 0 ? `${money(subtotal)} + productos por confirmar` : "por confirmar";

  out.push("", `Subtotal: ${subtotalText}`, "Envío: por confirmar", "");
  out.push(`Nombre: ${customer.name.trim()}`);
  out.push(`Dirección / colonia: ${customer.address.trim()}`);
  out.push(`Forma de pago: ${paymentLabel}`);

  if (customer.notes?.trim()) out.push("", `Notas: ${customer.notes.trim()}`);

  out.push("", "¿Me ayudas a confirmar disponibilidad y costo de entrega?");
  return out.join("\n");
}

/** En móvil (Instagram, etc.) navegar directo es más confiable que abrir pestaña. */
export function openWhatsApp(url) {
  const isMobile = /Android|iPhone|iPad|iPod|Instagram|FBAN|FBAV/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
    return;
  }
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}
