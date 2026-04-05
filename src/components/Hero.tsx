import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroLeft}>
          <div className={styles.logoBadge}>
            <span className={styles.badgeBrand}>Nazar</span>
            <span className={styles.badgeSub}>Soaps</span>
          </div>
        </div>
        <div className={styles.heroCenter}>
          <div className={styles.productShowcase}>
            <div className={styles.productPlaceholder}>
              <span>Product Image</span>
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroTagline}>
            <h1 className={styles.heroTitle}>DE-TAN</h1>
            <p className={styles.heroKa}>ka</p>
            <h2 className={styles.heroExpert}>EXPERT</h2>
            <p className={styles.heroProductName}>Nazar Soaps Magic Soap</p>
          </div>
          <Link href="/shop" className={styles.shopNowBtn}>Shop Now</Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className={styles.indicators}>
        <span className={`${styles.dot} ${styles.dotActive}`}></span>
        <span className={styles.dot}></span>
      </div>
    </section>
  );
}
