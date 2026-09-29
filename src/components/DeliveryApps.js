"use client";
import { useState } from "react";
import { deliveryApps } from "@/config/deliveryApps";
import styles from "./DeliveryApps.module.css";

function AppLogo({ app }) {
  const [failed, setFailed] = useState(false);
  if (failed || !app.logo) return <span className={styles.logoFallback}>{app.name}</span>;
  return (
    // Logo oficial desde /public/delivery-apps. Si falta el archivo, se muestra el nombre.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={app.logo} alt={app.name} className={styles.logo} onError={() => setFailed(true)} loading="lazy" />
  );
}

export default function DeliveryApps() {
  return (
    <section className="section" aria-labelledby="apps-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="apps-title" className="section-title">
            También puedes encontrarnos en
          </h2>
          <p className="section-lead">
            En las apps puedes pagar con tarjeta, según los métodos disponibles en cada una. Los precios pueden variar por plataforma.
          </p>
        </div>

        <ul className={styles.grid}>
          {deliveryApps.map((app) => {
            const live = Boolean(app.url);
            const inner = (
              <>
                <div className={styles.logoBox}>
                  <AppLogo app={app} />
                </div>
                <div className={styles.meta}>
                  <span className={styles.name}>{app.name}</span>
                  {live ? (
                    <span className={styles.link}>Pedir en {app.name}</span>
                  ) : (
                    <span className={styles.soon}>Próximamente</span>
                  )}
                </div>
              </>
            );
            return (
              <li key={app.id}>
                {live ? (
                  <a className={`${styles.card} ${styles.live}`} href={app.url} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div className={styles.card} aria-label={`${app.name}: próximamente, encuéntranos en la app`}>
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
