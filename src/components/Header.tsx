import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <>
      {/* Announcement Bar */}
      <div className={styles.announcementBar}>
        <p>ENJOY FREE SHIPPING ON PREPAID ORDERS + EXCITING FREEBIES</p>
      </div>

      <header className={styles.header}>
        {/* Top row: Shop All, Search, Logo, Track, User, Cart */}
        <div className={styles.topRow}>
          <div className={styles.leftActions}>
            <Link href="/shop" className={styles.shopAll}>Shop All</Link>
            <div className={styles.searchBar}>
              <input type="text" placeholder="Search" className={styles.searchInput} />
              <button className={styles.searchBtn} aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </div>
          </div>

          <Link href="/" className={styles.logoContainer}>
            <span className={styles.logoText}>Nazar</span>
            <span className={styles.logoSub}>Soaps</span>
            <span className={styles.logoTagline}>AYURVEDA+SCIENCE</span>
          </Link>

          <div className={styles.rightActions}>
            <Link href="/track" className={styles.trackLink}>Track Shipment</Link>
            <button className={styles.iconBtn} aria-label="Account">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <button className={styles.iconBtn} aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
          </div>
        </div>

        {/* Navigation row */}
        <nav className={styles.nav}>
          <Link href="/new-launches" className={styles.navLink}>New Launches</Link>
          <div className={styles.navDropdown}>
            <Link href="/category" className={styles.navLink}>
              Shop By Category
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </Link>
          </div>
          <div className={styles.navDropdown}>
            <Link href="/concern" className={styles.navLink}>
              Shop By Concern
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </Link>
          </div>
          <Link href="/combos" className={styles.navLink}>Combos</Link>
          <Link href="/bulk-order" className={styles.navLink}>Bulk Order</Link>
        </nav>
      </header>
    </>
  );
}
