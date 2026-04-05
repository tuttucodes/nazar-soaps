import Marquee from './Marquee';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.stars}>✦ ✦ ✦</span>
            <h2>Pankaj Tripathi<br/>RECOMMENDED</h2>
            <p>DESI MAGIC, SOLID LOGIC</p>
          </div>
          
          <div className={styles.mainTitleGroup}>
            <h1 className={styles.heroTitle}>DE-TAN</h1>
            <p className={styles.heroTitleSub}>ka</p>
            <h1 className={styles.heroTitleBold}>EXPERT</h1>
          </div>
          <p className={styles.heroTagline}>Ghar Soaps Magic Soap</p>
          
          <button className={styles.shopNowBtn}>Shop Now</button>
        </div>
      </div>
      
      {/* Marquee matching the exact text in screenshot */}
      <Marquee text="Bringing The Comfort of Home to Your Daily Routine." backgroundColor="var(--primary)" />
    </section>
  );
}
