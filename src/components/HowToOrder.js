import styles from "./HowToOrder.module.css";

const steps = [
  { n: "01", title: "Elige tu café", text: "Agrega tus bebidas favoritas al carrito." },
  { n: "02", title: "Completa tu pedido", text: "Indica dirección, pago y cualquier preferencia." },
  { n: "03", title: "Confirma por WhatsApp", text: "Tu pedido se enviará automáticamente para confirmar disponibilidad y entrega." },
];

export default function HowToOrder() {
  return (
    <section id="como-pedir" className="section" aria-labelledby="como-pedir-title">
      <div className="container">
        <h2 id="como-pedir-title" className="section-title">
          Cómo pedir
        </h2>

        <ol className={styles.steps}>
          {steps.map((s) => (
            <li key={s.n} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {s.n}
              </span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.cta}>
          <a href="#menu" className="btn btn-primary">
            Elegir mi café
          </a>
        </div>
      </div>
    </section>
  );
}
