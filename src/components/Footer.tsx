import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>Nazar Soaps</h2>
          <p className={styles.tagline}>AYURVEDA+SCIENCE</p>
          <p className={styles.slogan}>Bringing The Comfort of Home to Your Daily Routine.</p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
          </div>
        </div>

        <div className={styles.linksBlock}>
          <h3 className={styles.title}>Shop</h3>
          <ul className={styles.list}>
            <li><Link href="/category/soaps">Best Bathing Soaps</Link></li>
            <li><Link href="/category/face">Face Care</Link></li>
            <li><Link href="/category/body">Body Care</Link></li>
            <li><Link href="/combos">Combos</Link></li>
            <li><Link href="/new-launches">New Launches</Link></li>
          </ul>
        </div>

        <div className={styles.linksBlock}>
          <h3 className={styles.title}>Support</h3>
          <ul className={styles.list}>
            <li><Link href="/track">Track Shipment</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/returns">Returns & Refunds</Link></li>
          </ul>
        </div>

        <div className={styles.linksBlock}>
          <h3 className={styles.title}>Company</h3>
          <ul className={styles.list}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/bulk-order">Bulk Orders</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Nazar Soaps. All rights reserved.</p>
      </div>
    </footer>
  );
}
