import Image from "next/image";
import { site } from "@/config/site";
import styles from "./BrandStory.module.css";

export default function BrandStory() {
  return (
    <section id="moka" className={`section ${styles.section}`} aria-labelledby="moka-title">
      <div className={`container ${styles.grid}`}>
        <figure className={styles.photo}>
          {site.brandStoryPhoto ? (
            <Image
              src={site.brandStoryPhoto}
              alt="Moka, la gatita que inspiró el nombre de MOKA, cuando era pequeña"
              fill
              sizes="(max-width: 860px) 100vw, 520px"
              className={styles.img}
            />
          ) : (
            // Espacio reservado: sube la foto real a /public/brand y define site.brandStoryPhoto
            <div className={styles.placeholder} aria-hidden="true">
              <Image src="/brand/moka-isotipo.png" alt="" width={120} height={116} />
            </div>
          )}
        </figure>

        <div className={styles.copy}>
          <h2 id="moka-title" className="section-title">
            La Moka original
          </h2>
          <p className={styles.text}>
            Moka es la gatita que inspiró el nombre de este proyecto. MOKA nace de dos cosas muy simples: el cariño por ella y el
            gusto por ese pequeño momento de preparar un café en casa.
          </p>
          <p className={styles.closing}>Moka + café. Eso es todo. ♡</p>
        </div>
      </div>
    </section>
  );
}
