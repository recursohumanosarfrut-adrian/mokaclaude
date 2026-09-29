# MOKA — coffee at home

Tienda en línea de MOKA: menú, carrito persistente, checkout y envío del pedido por WhatsApp.
Next.js (App Router) + React. Sin base de datos ni backend.

---

## Arrancar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Requisitos: Node.js 20.9 o superior.

## Publicar en Vercel

**Opción A — desde la terminal**

```bash
npm i -g vercel
vercel          # primer despliegue (vista previa)
vercel --prod   # publicar en producción
```

Vercel detecta Next.js automáticamente; no hace falta configurar nada.

**Opción B — desde GitHub**

1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com → *Add New → Project* → importa el repositorio → *Deploy*.
3. Cada `git push` a `main` vuelve a publicar la página.

**Dominio propio (opcional):** en Vercel → *Settings → Domains*. Si usas dominio propio, agrega
la variable de entorno `NEXT_PUBLIC_SITE_URL=https://tudominio.com` para que la vista previa
al compartir el link (Instagram, WhatsApp) use la URL correcta.

---

## Dónde se edita cada cosa

| Qué quieres cambiar | Archivo |
| --- | --- |
| Precios, productos, descripciones, fotos, ocultar sabores | `src/config/products.js` |
| Links de **Uber Eats, DiDi Food y Rappi** | `src/config/deliveryApps.js` |
| WhatsApp, Instagram, horarios, formas de pago, foto de Moka | `src/config/site.js` |
| Texto del mensaje de WhatsApp | `src/lib/whatsapp.js` |
| Colores y tipografía | `src/app/globals.css` (sección de tokens al inicio) |

### Precios: directo vs. apps

Cada producto tiene dos precios separados:

```js
directPrice: 45,        // lo que cobra la web / WhatsApp
deliveryAppPrice: 69,   // referencia de Uber Eats; la web NO lo usa
```

- Si `directPrice` es `null`, la tarjeta muestra **Precio por confirmar**. Se puede agregar al
  carrito y en WhatsApp aparece como "precio por confirmar". Para bloquearlo, pon
  `allowOrderWithoutPrice: false` en `src/config/site.js`.
- Latte Macchiato, Caramel Macchiato y Moka Blanco están en `null` hasta que definas su precio directo.

### Agregar u ocultar un sabor

- Ocultar: `active: false`.
- Nuevo sabor: copia un bloque en `products.js`, cambia `id` (único, sin espacios), nombre, precio y capas.

### Fotos de producto

1. Guarda la foto en `public/products/` (ej. `cappuccino.jpg`, formato 4:3, mínimo 1200 px de ancho).
2. En `products.js` cambia `image: null` por `image: "/products/cappuccino.jpg"`.

Mientras `image` sea `null` se muestra el corte de capas de la bebida.

### Apps de delivery

En `src/config/deliveryApps.js`:

```js
export const uberEatsUrl = "";  // ← link directo a TU tienda
export const didiFoodUrl = "";
export const rappiUrl = "";
```

- Vacío → la tarjeta dice **Próximamente** y no enlaza a ningún lado.
- Con link → la tarjeta se vuelve botón "Pedir en …".

**Logos oficiales:** descárgalos del kit de marca / portal de socios de cada plataforma y guárdalos así:

```
public/delivery-apps/uber-eats.svg
public/delivery-apps/didi-food.svg
public/delivery-apps/rappi.svg
```

(Si tu archivo es PNG, cambia la extensión en `deliveryApps.js`.) Mientras falte un archivo,
la tarjeta muestra el nombre de la app en texto. La tarjeta ya deja un área blanca con espacio
de seguridad alrededor del logo.

### Foto de Moka

1. Guarda la foto original en `public/brand/` (ej. `moka-original.jpg`, vertical 4:5 idealmente).
2. En `src/config/site.js`: `brandStoryPhoto: "/brand/moka-original.jpg"`.

### Instagram

`src/config/site.js` → `instagramUrl: "https://instagram.com/tu_usuario"`.

---

## Assets de marca (`public/brand`)

| Archivo | Uso |
| --- | --- |
| `moka-logo-original.png` | Logo oficial tal como se entregó |
| `moka-logo.png` | Mismo logo, recortado y con fondo transparente (footer) |
| `moka-isotipo.png` | Taza de Moka, recorte del logo oficial (header, favicon) |
| `moka-wordmark.png` | Palabra MOKA, recorte del logo oficial (header) |

El header combina isotipo + wordmark en horizontal porque el logo completo es muy pequeño a
esa altura. Si tienes una versión horizontal oficial, reemplaza `src/components/Logo.js`.

Favicon, ícono de iPhone y la imagen para compartir en redes están en `src/app/`
(`icon.png`, `apple-icon.png`, `opengraph-image.png`).

---

## Cómo funciona el pedido

1. El carrito se guarda en el navegador (`localStorage`), así no se pierde al recargar.
2. El cliente llena nombre, dirección/colonia, forma de pago y notas (se recuerdan para su próximo pedido, excepto las notas).
3. **Enviar pedido** abre `https://wa.me/525512582889?text=…` con el pedido completo.
4. El carrito no se vacía hasta que el cliente confirma "Ya lo envié", por si cierra WhatsApp sin enviar.

El estado "Abierto ahora / Abrimos hoy a las…" se calcula con la hora de Ciudad de México usando
los horarios de `site.js`.

## Estructura

```
src/
  app/            layout, página, estilos globales, íconos
  components/     Header, TopBar, Hero, Menu, ProductCard, DrinkVisual, CartDrawer,
                  CheckoutForm, MobileCartBar, HowToOrder, DeliverySection,
                  DeliveryApps, BrandStory, Footer, Logo, Icons
  config/         products.js · site.js · deliveryApps.js   ← aquí editas
  context/        CartContext.js (carrito + localStorage)
  lib/            whatsapp.js · hours.js · format.js
public/
  brand/          logo oficial y recortes
  products/       fotos de producto (vacía por ahora)
  delivery-apps/  logos oficiales de las apps (vacía por ahora)
```
