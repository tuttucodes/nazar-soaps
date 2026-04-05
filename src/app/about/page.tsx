import PageShell from '@/components/PageShell';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>About Nazar Soaps</h1>
        <p className={styles.tagline}>Ayurveda + Science</p>

        <div className={styles.section}>
          <h2>Our Story</h2>
          <p>Nazar Soaps was born out of a simple belief — that skincare should be effective, affordable, and rooted in nature. We combine the ancient wisdom of Ayurveda with modern scientific research to create products that truly deliver results.</p>
          <p>What started as a small passion project has grown into a brand trusted by over a million customers across India. Every product we create goes through rigorous testing and is formulated with carefully selected natural ingredients.</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNum}>10L+</span>
            <span className={styles.statLabel}>Products Sold</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>4.7</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>50+</span>
            <span className={styles.statLabel}>Products</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Natural Ingredients</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Our Mission</h2>
          <p>To bring the comfort of home to your daily routine by creating natural, chemical-free skincare products that everyone can trust and afford. We believe that healthy, glowing skin should not come at the cost of harsh chemicals or a hefty price tag.</p>
        </div>

        <div className={styles.section}>
          <h2>What Makes Us Different</h2>
          <ul className={styles.list}>
            <li><strong>Ayurveda + Science:</strong> We blend time-tested Ayurvedic ingredients with clinically proven actives for maximum effectiveness.</li>
            <li><strong>No Harmful Chemicals:</strong> All products are free from parabens, sulfates, mineral oil, and artificial fragrances.</li>
            <li><strong>Dermatologically Tested:</strong> Every product is tested for safety and efficacy before launch.</li>
            <li><strong>Affordable Luxury:</strong> Premium quality skincare at prices that are accessible to everyone.</li>
            <li><strong>Eco-Conscious:</strong> We use sustainable packaging and cruelty-free practices.</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
