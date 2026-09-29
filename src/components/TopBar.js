"use client";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { formatRange } from "@/lib/hours";
import styles from "./TopBar.module.css";

const messages = [
  `Entregas en todo ${site.deliveryArea}`,
  ...site.hours.map((h) => `${h.short} · ${formatRange(h, "–")}`),
];

export default function TopBar() {
  const [index, setIndex] = useState(0);

  // En móvil los mensajes rotan; en escritorio se muestran todos.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.bar}>
      <ul className={`container ${styles.list}`}>
        {messages.map((m, i) => (
          <li key={m} className={i === index ? styles.active : undefined} aria-hidden={i !== index ? "true" : undefined}>
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
