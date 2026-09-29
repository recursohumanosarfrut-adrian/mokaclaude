import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/figtree";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "MOKA — coffee at home · Café a domicilio en Coacalco",
  description:
    "Café preparado al momento, hecho en casa y entregado hasta tu puerta. Entregas en todo Coacalco. Pide por WhatsApp.",
  openGraph: {
    title: "MOKA — coffee at home",
    description: "Tu café favorito, sin salir de casa. Entregas en todo Coacalco.",
    locale: "es_MX",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F8F1E7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
