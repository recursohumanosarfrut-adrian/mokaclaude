"use client";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { money, plural } from "@/lib/format";
import styles from "./MobileCartBar.module.css";

export default function MobileCartBar() {
  const { count, subtotal, hasUnpriced, hydrated, isOpen, openCart, addSignal } = useCart();
  const visible = hydrated && count > 0 && !isOpen;

  useEffect(() => {
    document.body.classList.toggle("has-cart-bar", hydrated && count > 0);
  }, [hydrated, count]);

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ""}`} aria-hidden={!visible}>
      <button type="button" className={styles.bar} onClick={() => openCart("cart")} tabIndex={visible ? 0 : -1} key={addSignal}>
        <span className={styles.summary}>
          <span>{plural(count, "producto", "productos")}</span>
          <span className={styles.sep} aria-hidden="true" />
          <span className={styles.total}>
            {money(subtotal)}
            {hasUnpriced && "+"}
          </span>
        </span>
        <span className={styles.cta}>Ver carrito →</span>
      </button>
    </div>
  );
}
