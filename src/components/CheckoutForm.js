"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { money, plural } from "@/lib/format";
import { buildOrderMessage, openWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { ChatIcon } from "./Icons";
import styles from "./CartDrawer.module.css";

const CUSTOMER_KEY = "moka:customer:v1";
const empty = { name: "", address: "", payment: "", notes: "" };

export default function CheckoutForm({ onSent }) {
  const { lines, count, subtotal, hasUnpriced } = useCart();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const refs = { name: useRef(null), address: useRef(null), payment: useRef(null) };

  // Recordar datos del cliente para su próximo pedido (sin las notas)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "null");
      if (saved) setForm((f) => ({ ...f, name: saved.name || "", address: saved.address || "", payment: saved.payment || "" }));
    } catch {}
  }, []);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Escribe tu nombre.";
    if (!form.address.trim()) er.address = "Escribe tu dirección y colonia.";
    if (!form.payment) er.payment = "Elige una forma de pago.";
    setErrors(er);
    const first = ["name", "address", "payment"].find((k) => er[k]);
    if (first) refs[first].current?.focus();
    return !first;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lines.length === 0 || !validate()) return;

    const payment = site.paymentMethods.find((p) => p.id === form.payment);
    const message = buildOrderMessage({
      lines,
      subtotal,
      hasUnpriced,
      customer: form,
      paymentLabel: payment?.label ?? form.payment,
    });
    const url = whatsappUrl(message);

    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify({ name: form.name, address: form.address, payment: form.payment }));
    } catch {}

    onSent(url);
    openWhatsApp(url);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.scroll}>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="co-name">Nombre</label>
            <input
              ref={refs.name}
              id="co-name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={set("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "co-name-err" : undefined}
              placeholder="¿A nombre de quién?"
            />
            {errors.name && (
              <p id="co-name-err" className={styles.error}>
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="co-address">Dirección / colonia</label>
            <textarea
              ref={refs.address}
              id="co-address"
              name="address"
              rows={2}
              autoComplete="street-address"
              value={form.address}
              onChange={set("address")}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "co-address-err" : undefined}
              placeholder="Calle, número y colonia"
            />
            {errors.address && (
              <p id="co-address-err" className={styles.error}>
                {errors.address}
              </p>
            )}
          </div>

          <fieldset className={styles.field} aria-describedby={errors.payment ? "co-pay-err" : undefined}>
            <legend>Forma de pago</legend>
            <div className={styles.payments}>
              {site.paymentMethods.map((m, i) => (
                <label key={m.id} className={styles.payment} data-checked={form.payment === m.id}>
                  <input
                    ref={i === 0 ? refs.payment : undefined}
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={form.payment === m.id}
                    onChange={set("payment")}
                  />
                  <span className={styles.radio} aria-hidden="true" />
                  <span>
                    <strong>{m.label}</strong>
                    <small>{m.detail}</small>
                  </span>
                </label>
              ))}
            </div>
            {errors.payment && (
              <p id="co-pay-err" className={styles.error}>
                {errors.payment}
              </p>
            )}
            <div className={styles.notice}>
              <p>
                <strong>Pago con tarjeta próximamente.</strong>
              </p>
              <p>Si pides por Uber Eats, DiDi Food o Rappi, puedes pagar con tarjeta según los métodos disponibles en cada app.</p>
            </div>
          </fieldset>

          <div className={styles.field}>
            <label htmlFor="co-notes">
              Notas adicionales <span className={styles.optional}>(opcional)</span>
            </label>
            <textarea
              id="co-notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={set("notes")}
              placeholder="Ej. un americano con azúcar, referencias para llegar…"
            />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <dl className={styles.summary}>
          <div>
            <dt>Subtotal · {plural(count, "producto", "productos")}</dt>
            <dd>{hasUnpriced && subtotal === 0 ? "Por confirmar" : money(subtotal)}</dd>
          </div>
          <div>
            <dt>Entrega</dt>
            <dd className={styles.tbd}>Por confirmar</dd>
          </div>
        </dl>
        <button type="submit" className="btn btn-primary btn-block" disabled={lines.length === 0}>
          <ChatIcon />
          Enviar pedido
        </button>
        <p className={styles.hint}>Se abrirá WhatsApp con tu pedido listo para enviar.</p>
      </div>
    </form>
  );
}
