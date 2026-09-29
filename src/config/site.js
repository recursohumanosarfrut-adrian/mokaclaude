/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN GENERAL DE MOKA
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "MOKA",
  descriptor: "coffee at home",
  tagline: "Good Coffee. Better Days.",
  taglineEs: "Buen café hace mejores días.",
  signature: "Hecho en casa, con amor por ti.",

  location: "Coacalco, Estado de México",
  deliveryArea: "Coacalco",

  // Número oficial de pedidos
  whatsapp: {
    number: "525512582889", // formato wa.me: país + número, sin + ni espacios
    display: "55 1258 2889",
    displayIntl: "+52 55 1258 2889",
  },

  // ⬇️ Pega aquí el link de Instagram (ej. "https://instagram.com/moka.coffeeathome")
  instagramUrl: "",

  // Zona horaria para calcular "Abierto ahora"
  timeZone: "America/Mexico_City",

  // Horarios (24 h). days: 0 = domingo … 6 = sábado
  hours: [
    { label: "Lunes a viernes", short: "Lun–Vie", days: [1, 2, 3, 4, 5], open: "18:30", close: "22:00" },
    { label: "Sábado y domingo", short: "Sáb–Dom", days: [0, 6], open: "09:00", close: "17:00" },
  ],

  paymentMethods: [
    { id: "transferencia", label: "Transferencia", detail: "Te compartimos los datos al confirmar tu pedido." },
    { id: "efectivo", label: "Efectivo", detail: "Solo en entregas directas." },
  ],

  // ⬇️ Foto real de Moka. Súbela a /public/brand/ y escribe la ruta,
  //    por ejemplo: "/brand/moka-original.jpg"
  brandStoryPhoto: "",

  // Permite agregar al carrito productos sin precio directo definido.
  // En el pedido aparecerán como "precio por confirmar".
  allowOrderWithoutPrice: true,
};
