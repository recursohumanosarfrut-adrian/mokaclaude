"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { money, plural } from "@/lib/format";
import { openWhatsApp } from "@/lib/whatsapp";
import CheckoutForm from "./CheckoutForm";
import DrinkVisual from "./DrinkVisual";
import { BackIcon, BagIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon } from "./Icons";
import styles from "./CartDrawer.module.css";

const titles = { cart: "Tu pedido", checkout: "Datos de entrega", sent: "Pedido listo" };

export default function CartDrawer() {
  const { lines, count, subtotal, hasUnpriced, add, decrement, remove, clear, isOpen, step, setStep, closeCart, maxQty } = useCart();
  const [sentUrl, setSentUrl] = useState("");
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  // Bloquear scroll, foco y tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement;
    document.body.classList.add("cart-open");
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("cart-open");
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [isOpen, closeCart]);

  // Si el carrito se vacía estando en checkout, regresar
  useEffect(() => {
    if (lines.length === 0 && step === "checkout") setStep("cart");
  }, [lines.length, step, setStep]);

  const finish = () => {
    clear();
    closeCart();
    setTimeout(() => setStep("cart"), 400);
  };

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={closeCart} aria-hidden="true" />

      <aside
        className={`${styles.panel} ${isOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
      >
        <span className={styles.grabber} aria-hidden="true" />

        <header className={styles.head}>
          {step === "checkout" ? (
            <button type="button" className={styles.iconBtn} onClick={() => setStep("cart")} aria-label="Volver al carrito">
              <BackIcon />
            </button>
          ) : null}
          <div className={styles.headText}>
            <h2 id="cart-title">{titles[step]}</h2>
            {step !== "sent" && count > 0 && <p>{plural(count, "producto", "productos")}</p>}
          </div>
          <button ref={closeRef} type="button" className={styles.iconBtn} onClick={closeCart} aria-label="Cerrar carrito">
            <CloseIcon />
          </button>
        </header>

        {step !== "sent" && lines.length > 0 && (
          <ol className={styles.progress} aria-label="Pasos del pedido">
            <li data-active={step === "cart"} data-done={step === "checkout"}>
              <span>1</span> Carrito
            </li>
            <li data-active={step === "checkout"}>
              <span>2</span> Datos
            </li>
            <li>
              <span>3</span> WhatsApp
            </li>
          </ol>
        )}

        {/* PASO 1 — CARRITO */}
        {step === "cart" &&
          (lines.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <BagIcon size={28} />
              </span>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega tus bebidas desde el menú.</p>
              <a
                href="#menu"
                className="btn btn-primary"
                onClick={() => {
                  closeCart();
                }}
              >
                Ver menú
              </a>
            </div>
          ) : (
            <>
              <div className={styles.scroll}>
                <ul className={styles.items}>
                  {lines.map((l) => (
                    <li key={l.id} className={styles.item}>
                      <div className={styles.thumb} aria-hidden="true">
                        <DrinkVisual product={l.product} size="sm" showLabels={false} />
                      </div>
                      <div className={styles.itemBody}>
                        <div className={styles.itemTop}>
                          <h3>{l.name}</h3>
                          <p className={styles.lineTotal}>{l.lineTotal != null ? money(l.lineTotal) : "Por confirmar"}</p>
                        </div>
                        <p className={styles.unit}>{l.unitPrice != null ? `${money(l.unitPrice)} c/u` : "Precio por confirmar"}</p>
                        <div className={styles.itemActions}>
                          <div className={styles.qty} role="group" aria-label={`Cantidad de ${l.name}`}>
                            <button type="button" onClick={() => decrement(l.id)} aria-label={`Quitar un ${l.name}`}>
                              <MinusIcon size={16} />
                            </button>
                            <output aria-live="polite">{l.qty}</output>
                            <button type="button" onClick={() => add(l.id)} disabled={l.qty >= maxQty} aria-label={`Agregar otro ${l.name}`}>
                              <PlusIcon size={16} />
                            </button>
                          </div>
                          <button type="button" className={styles.remove} onClick={() => remove(l.id)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.footer}>
                <dl className={styles.summary}>
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{hasUnpriced && subtotal === 0 ? "Por confirmar" : money(subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Entrega</dt>
                    <dd className={styles.tbd}>Por confirmar</dd>
                  </div>
                </dl>
                {hasUnpriced && <p className={styles.hint}>Algunos productos tienen precio por confirmar; te lo confirmamos por WhatsApp.</p>}
                <button type="button" className="btn btn-primary btn-block" onClick={() => setStep("checkout")}>
                  Continuar
                </button>
                <p className={styles.hint}>El costo de entrega se confirma según tu ubicación.</p>
              </div>
            </>
          ))}

        {/* PASO 2 — DATOS */}
        {step === "checkout" && (
          <CheckoutForm
            onSent={(url) => {
              setSentUrl(url);
              setStep("sent");
            }}
          />
        )}

        {/* PASO 3 — ENVIADO */}
        {step === "sent" && (
          <div className={styles.sent}>
            <span className={styles.sentIcon}>
              <CheckIcon size={26} />
            </span>
            <h3>Tu pedido está listo en WhatsApp</h3>
            <p>Envía el mensaje en WhatsApp para que confirmemos disponibilidad y costo de entrega.</p>
            <div className={styles.sentActions}>
              <button type="button" className="btn btn-primary btn-block" onClick={() => sentUrl && openWhatsApp(sentUrl)}>
                Abrir WhatsApp de nuevo
              </button>
              <button type="button" className="btn btn-secondary btn-block" onClick={finish}>
                Ya lo envié, vaciar carrito
              </button>
              <button type="button" className={styles.textBtn} onClick={() => setStep("cart")}>
                Volver al carrito
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
