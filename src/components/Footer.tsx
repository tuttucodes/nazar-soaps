import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>Nazar Soaps</h2>
          <p className={styles.slogan}>Nature's secret to flawless skin.</p>
        </div>
        <div className={styles.linksBlock}>
          <h3 className={styles.title}>Shop</h3>
          <ul className={styles.list}>
            <li><Link href="/soaps">Best Bathing Soaps</Link></li>
            <li><Link href="/face">Face Care</Link></li>
            <li><Link href="/body">Body Care</Link></li>
          </ul>
        </div>
        <div className={styles.linksBlock}>
          <h3 className={styles.title}>Information</h3>
          <ul className={styles.list}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Nazar Soaps. All rights reserved.</p>
      </div>
    </footer>
  );
}
