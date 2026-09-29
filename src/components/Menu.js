import { activeProducts } from "@/config/products";
import ProductCard from "./ProductCard";
import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <section id="menu" className={`section ${styles.menu}`} aria-labelledby="menu-title">
      <div className="container">
        <header className={styles.head}>
          <div>
            <h2 id="menu-title" className="section-title">
              Menú
            </h2>
            <p className="section-lead">Preparado al momento de tu pedido. Agrega tus bebidas y envíanos tu pedido por WhatsApp.</p>
          </div>
          <p className={styles.note}>
            Precios de venta directa.
            <br />
            El envío se confirma según tu ubicación.
          </p>
        </header>

        <ul className={styles.grid}>
          {activeProducts.map((p, i) => (
            <li key={p.id}>
              <ProductCard product={p} priority={i < 2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
