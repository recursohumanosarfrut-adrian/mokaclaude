"use client";
import { activeProducts, hasDirectPrice } from "@/config/products";
import { site } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useOpenStatus } from "@/lib/useOpenStatus";
import { money } from "@/lib/format";
import DrinkVisual from "./DrinkVisual";
import { ChatIcon, PinIcon } from "./Icons";
import styles from "./Hero.module.css";

const lowestPrice = Math.min(...activeProducts.filter(hasDirectPrice).map((p) => p.directPrice));

export default function Hero() {
  const { count, openCart } = useCart();
  const status = useOpenStatus();

  const handleOrder = () => {
    if (count > 0) openCart("checkout");
    else document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            Tu café favorito,
            <br />
            sin salir de casa.
          </h1>
          <p className={styles.lead}>Café preparado al momento, hecho en casa y entregado hasta tu puerta.</p>

          <div className={styles.ctas}>
            <a href="#menu" className="btn btn-primary">
              Ver menú
            </a>
            <button type="button" onClick={handleOrder} className="btn btn-secondary">
              Hacer pedido
            </button>
          </div>

          <ul className={styles.facts}>
            <li>
              <PinIcon />
              Entrega en todo {site.deliveryArea}
            </li>
            <li>
              <ChatIcon size={18} />
              Pedidos por WhatsApp
            </li>
          </ul>
        </div>

        <div className={styles.stage}>
          <div className={styles.lineup} aria-hidden="true">
            {activeProducts.map((p) => (
              <div key={p.id} className={styles.drink}>
                <DrinkVisual product={p} size="md" showLabels={false} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <p className={styles.status} data-open={status?.open ? "true" : "false"} aria-live="polite">
              <span className={styles.dot} />
              {status ? status.label : "Horario de hoy"}
            </p>
            <p className={styles.statusDetail}>{status?.detail || "\u00a0"}</p>
            {Number.isFinite(lowestPrice) && (
              <p className={styles.from}>
                Café desde <strong>{money(lowestPrice)}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
