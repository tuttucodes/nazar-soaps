import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Embrace Your Natural Glow</h1>
        <p className={styles.subtitle}>Chemical-free, organic skincare products that nourish and heal your skin. Tested by experts, loved by over a million customers.</p>
        <div className={styles.btngroup}>
          <button className="btn-primary">Shop Now</button>
          <button className={styles.btnOutline}>Take the Skin Quiz</button>
        </div>
      </div>
      <div className={styles.heroImageContainer}>
        <div className={styles.heroImagePlaceholder}>
          <div className={styles.glassBadge}>100% Organic</div>
        </div>
      </div>
    </section>
  );
}
