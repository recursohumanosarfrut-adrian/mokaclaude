import Image from "next/image";
import isotipo from "../../public/brand/moka-isotipo.png";
import wordmark from "../../public/brand/moka-wordmark.png";
import lockup from "../../public/brand/moka-logo.png";

/**
 * Logo oficial de MOKA (sin redibujar).
 * variant "horizontal": isotipo + palabra MOKA (header)
 * variant "full": logo completo con "coffee at home"
 */
export default function Logo({ variant = "horizontal", height = 40, priority = false, className }) {
  if (variant === "full") {
    const w = Math.round((lockup.width / lockup.height) * height);
    return <Image src={lockup} alt="MOKA — coffee at home" width={w} height={height} priority={priority} className={className} />;
  }
  const isoW = Math.round((isotipo.width / isotipo.height) * height);
  const wordH = Math.round(height * 0.5);
  const wordW = Math.round((wordmark.width / wordmark.height) * wordH);
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: Math.round(height * 0.22) }}>
      <Image src={isotipo} alt="" width={isoW} height={height} priority={priority} />
      <Image src={wordmark} alt="MOKA" width={wordW} height={wordH} priority={priority} />
    </span>
  );
}
