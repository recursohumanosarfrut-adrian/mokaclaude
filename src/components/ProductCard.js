"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { hasDirectPrice } from "@/config/products";
import { site } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { money } from "@/lib/format";
import DrinkVisual from "./DrinkVisual";
import { CheckIcon, MinusIcon, PlusIcon } from "./Icons";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, priority = false }) {
  const { add, decrement, qtyOf, hydrated, maxQty } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const qty = hydrated ? qtyOf(product.id) : 0;
  const priced = hasDirectPrice(product);
  const orderable = priced || site.allowOrderWithoutPrice;

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleAdd = () => {
    add(product.id);
    setJustAdded(true);
  };

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 120px, (max-width: 980px) 50vw, 380px"
            className={styles.photo}
            priority={priority}
          />
        ) : (
          <DrinkVisual product={product} size="md" />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>
            {product.name}
            {product.subtitle && <span className={styles.subtitle}>{product.subtitle}</span>}
          </h3>
          <p className={priced ? styles.price : styles.priceTbd}>{priced ? money(product.directPrice) : "Precio por confirmar"}</p>
        </div>
        <p className={styles.desc}>{product.description}</p>

        <div className={styles.action}>
          {qty === 0 ? (
            <button type="button" className={`btn btn-primary btn-block ${styles.add}`} onClick={handleAdd} disabled={!orderable}>
              <PlusIcon />
              Agregar
            </button>
          ) : (
            <div className={styles.inCart}>
              <div className={styles.stepper} role="group" aria-label={`Cantidad de ${product.name}`}>
                <button type="button" onClick={() => decrement(product.id)} aria-label={`Quitar un ${product.name}`}>
                  <MinusIcon />
                </button>
                <output aria-live="polite">{qty}</output>
                <button type="button" onClick={handleAdd} disabled={qty >= maxQty} aria-label={`Agregar otro ${product.name}`}>
                  <PlusIcon />
                </button>
              </div>
              <span className={`${styles.added} ${justAdded ? styles.addedFlash : ""}`}>
                <CheckIcon size={16} />
                {justAdded ? "Agregado" : "En tu pedido"}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
