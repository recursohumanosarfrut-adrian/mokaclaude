import styles from "./DrinkVisual.module.css";

/**
 * Corte transversal de la bebida: muestra sus capas en lugar de una foto falsa.
 * size: "sm" | "md" | "lg"   ·   showLabels: etiquetas de cada capa
 */
export default function DrinkVisual({ product, size = "md", showLabels = true }) {
  const layers = product.layers ?? [];
  const total = layers.reduce((n, l) => n + l.ratio, 0) || 1;

  return (
    <figure className={`${styles.wrap} ${styles[size]}`} aria-label={`${product.name}: ${layers.map((l) => l.label).join(", ")}`}>
      <div className={styles.glass}>
        {layers.map((l, i) => (
          <span key={i} className={styles.layer} style={{ flexGrow: l.ratio / total, background: l.color }} />
        ))}
      </div>
      {showLabels && (
        <ol className={styles.labels} aria-hidden="true">
          {layers.map((l, i) => (
            <li key={i} style={{ flexGrow: l.ratio / total }}>
              <span>{l.label}</span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
