"use client";
import { site } from "@/config/site";
import { formatRange } from "@/lib/hours";
import { useOpenStatus } from "@/lib/useOpenStatus";
import { whatsappUrl } from "@/lib/whatsapp";
import styles from "./DeliverySection.module.css";

export default function DeliverySection() {
  const status = useOpenStatus();

  return (
    <section id="entregas" className={`section ${styles.section}`} aria-labelledby="entregas-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="entregas-title" className="section-title">
            Entrega en todo {site.deliveryArea}
          </h2>
          <p className="section-lead">El costo de envío se confirma de acuerdo con la ubicación de entrega.</p>
          <p className={styles.contact}>
            Pedidos por WhatsApp al{" "}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              {site.whatsapp.display}
            </a>
          </p>
        </div>

        <div className={styles.hours}>
          <div className={styles.hoursHead}>
            <h3 id="horarios-title">Horarios</h3>
            {status && (
              <span className={styles.status} data-open={status.open ? "true" : "false"}>
                <span className={styles.dot} />
                {status.open ? `Abierto · ${status.detail.toLowerCase()}` : status.detail}
              </span>
            )}
          </div>
          <dl className={styles.list}>
            {site.hours.map((h) => (
              <div key={h.label} className={styles.row}>
                <dt>{h.label}</dt>
                <dd>{formatRange(h)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
