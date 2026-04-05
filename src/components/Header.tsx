import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navLinks}>
          <Link href="/shop" className={styles.link}>Shop</Link>
          <Link href="/concerns" className={styles.link}>Concerns</Link>
          <Link href="/about" className={styles.link}>About Us</Link>
        </div>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            Nazar Soaps
          </Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className={styles.cartCount}>0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
