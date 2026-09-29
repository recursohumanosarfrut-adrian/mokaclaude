import Logo from "./Logo";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo variant="full" height={132} />
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <div className={styles.cols}>
          <div>
            <h3>Ubicación</h3>
            <p>{site.location}</p>
          </div>
          <div>
            <h3>Pedidos</h3>
            <p>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                {site.whatsapp.display}
              </a>
            </p>
          </div>
          <div>
            <h3>Enlaces</h3>
            <ul>
              <li>
                {site.instagramUrl ? (
                  <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                ) : (
                  <span>Instagram</span>
                )}
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#menu">Menú</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.bottom}>
          <p>© {year} MOKA — coffee at home</p>
          <p>{site.signature}</p>
        </div>
      </div>
    </footer>
  );
}
