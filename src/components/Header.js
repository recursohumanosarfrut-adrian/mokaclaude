"use client";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { BagIcon, CloseIcon, MenuIcon } from "./Icons";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#como-pedir", label: "Cómo pedir" },
  { href: "#entregas", label: "Entregas" },
  { href: "#moka", label: "Moka" },
];

export default function Header() {
  const { count, hydrated, openCart, addSignal } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [addSignal]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.logo} aria-label="MOKA, ir al inicio">
          <Logo height={38} priority />
        </a>

        <nav className={styles.nav} aria-label="Principal">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.cart} ${bump ? styles.bump : ""}`}
            onClick={() => openCart("cart")}
            aria-label={`Abrir carrito, ${count} ${count === 1 ? "producto" : "productos"}`}
          >
            <BagIcon />
            <span className={styles.cartLabel}>Carrito</span>
            <span className={`${styles.badge} ${hydrated && count > 0 ? styles.badgeOn : ""}`} aria-hidden="true">
              {count}
            </span>
          </button>

          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`} aria-label="Principal móvil">
        <div className="container">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              {n.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
