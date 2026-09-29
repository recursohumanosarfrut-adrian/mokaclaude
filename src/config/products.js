/**
 * ─────────────────────────────────────────────────────────────
 *  MENÚ DE MOKA — fuente única de productos y precios
 * ─────────────────────────────────────────────────────────────
 *
 *  directPrice       → precio de venta directa (web + WhatsApp).
 *                      Es el ÚNICO precio que usa la tienda y el carrito.
 *                      Si todavía no está definido, déjalo en null:
 *                      la tarjeta mostrará "Precio por confirmar".
 *
 *  deliveryAppPrice  → precio en apps de delivery (Uber Eats, etc.).
 *                      Solo se guarda como referencia; la web NO lo muestra
 *                      ni lo usa para calcular nada.
 *
 *  image             → ruta a una foto real dentro de /public/products
 *                      (ej. "/products/americano.jpg"). Mientras sea null
 *                      se muestra la ilustración de capas de la bebida.
 *
 *  active            → false para ocultar el producto sin borrarlo.
 *
 *  layers            → composición visual de la bebida (de arriba hacia abajo)
 *                      para el visual de la tarjeta. `ratio` es la proporción
 *                      de cada capa (no tienen que sumar exactamente 1).
 */

const tone = {
  crema: "#B88A5E",
  cafe: "#4A3526",
  espresso: "#3B2B1F",
  espressoCapa: "#6B4A33",
  espuma: "#FBF6EE",
  leche: "#EBDCC6",
  caramelo: "#A67C52",
  cafeConLeche: "#C4A27F",
  chocolateBlanco: "#F2E8D8",
};

export const products = [
  {
    id: "americano",
    name: "Americano",
    description: "Café negro, aromático y equilibrado.",
    directPrice: 39,
    deliveryAppPrice: 59,
    image: null,
    active: true,
    layers: [
      { label: "crema", color: tone.crema, ratio: 0.08 },
      { label: "café", color: tone.cafe, ratio: 0.92 },
    ],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Café suave, cremoso y con espuma de leche.",
    directPrice: 45,
    deliveryAppPrice: 69,
    image: null,
    active: true,
    layers: [
      { label: "espuma", color: tone.espuma, ratio: 0.34 },
      { label: "leche", color: tone.leche, ratio: 0.3 },
      { label: "espresso", color: tone.espresso, ratio: 0.36 },
    ],
  },
  {
    id: "latte-macchiato",
    name: "Latte Macchiato",
    description: "Más leche, textura sedosa y café suave en capas.",
    directPrice: null, // ← define aquí tu precio directo
    deliveryAppPrice: 75,
    image: null,
    active: true,
    layers: [
      { label: "espuma", color: tone.espuma, ratio: 0.2 },
      { label: "espresso", color: tone.espressoCapa, ratio: 0.18 },
      { label: "leche", color: tone.leche, ratio: 0.62 },
    ],
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Cremoso y reconfortante, con notas dulces de caramelo.",
    directPrice: null, // ← define aquí tu precio directo
    deliveryAppPrice: 79,
    image: null,
    active: true,
    layers: [
      { label: "caramelo", color: tone.caramelo, ratio: 0.08 },
      { label: "espuma", color: tone.espuma, ratio: 0.16 },
      { label: "espresso", color: tone.espressoCapa, ratio: 0.18 },
      { label: "leche", color: tone.leche, ratio: 0.58 },
    ],
  },
  {
    id: "moka-blanco",
    name: "Moka Blanco",
    subtitle: "White Mocha",
    description: "Café cremoso con notas de chocolate blanco.",
    directPrice: null, // ← define aquí tu precio directo
    deliveryAppPrice: 79,
    image: null,
    active: true,
    layers: [
      { label: "espuma", color: tone.espuma, ratio: 0.22 },
      { label: "café con leche", color: tone.cafeConLeche, ratio: 0.5 },
      { label: "chocolate blanco", color: tone.chocolateBlanco, ratio: 0.28 },
    ],
  },
];

export const activeProducts = products.filter((p) => p.active);

export function getProduct(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function hasDirectPrice(product) {
  return typeof product?.directPrice === "number" && product.directPrice > 0;
}
