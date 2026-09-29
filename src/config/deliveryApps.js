/**
 * ─────────────────────────────────────────────────────────────
 *  APPS DE DELIVERY — pega aquí los links reales de tu tienda
 * ─────────────────────────────────────────────────────────────
 *
 *  Mientras un link esté vacío (""), la tarjeta muestra "Próximamente"
 *  y NO enlaza al home general de la plataforma.
 *
 *  Logos oficiales: descarga cada logo del kit de marca / portal de socios
 *  de cada plataforma y guárdalo en /public/delivery-apps/ con el nombre
 *  indicado en `logo`. Si el archivo no existe, se muestra el nombre en texto.
 */

export const uberEatsUrl = ""; // ← ej. "https://www.ubereats.com/mx/store/moka-..."
export const didiFoodUrl = ""; // ← link de tu tienda en DiDi Food
export const rappiUrl = ""; //    ← link de tu tienda en Rappi

export const deliveryApps = [
  { id: "uber-eats", name: "Uber Eats", url: uberEatsUrl, logo: "/delivery-apps/uber-eats.svg" },
  { id: "didi-food", name: "DiDi Food", url: didiFoodUrl, logo: "/delivery-apps/didi-food.svg" },
  { id: "rappi", name: "Rappi", url: rappiUrl, logo: "/delivery-apps/rappi.svg" },
];
