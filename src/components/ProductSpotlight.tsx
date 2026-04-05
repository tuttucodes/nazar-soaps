import Link from 'next/link';
import styles from './ProductSpotlight.module.css';

interface ProductSpotlightProps {
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  bgColor: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function ProductSpotlight({
  badge,
  name,
  tagline,
  description,
  bgColor,
  ctaText = 'Buy Now',
  ctaHref = '/shop',
}: ProductSpotlightProps) {
  return (
    <section className={styles.section} style={{ backgroundColor: bgColor }}>
      <div className={styles.container}>
        <div className={styles.imageArea}>
          <div className={styles.imagePlaceholder}>
            {badge && <span className={styles.badge}>{badge}</span>}
            <span className={styles.placeholderText}>{name} Image</span>
          </div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.tagline}>{tagline}</h2>
          <p className={styles.description}>{description}</p>
          <Link href={ctaHref} className={styles.ctaBtn}>{ctaText}</Link>
        </div>
      </div>
    </section>
  );
}
