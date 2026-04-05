"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      {/* 1. Top Promo Bar */}
      <div className={styles.promoBar}>
        ENJOY FREE SHIPPING ON PREPAID ORDERS + EXCITING FREEBIES 🎁
      </div>

      {/* 2. Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.leftSection}>
          <Link href="/shop" className={styles.shopAll}>Shop All</Link>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search" className={styles.searchInput} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className={styles.logoSection}>
          <Link href="/">
            <div className={styles.logoGrid}>
              <span className={styles.logoMain}>Nazar</span>
              <span className={styles.logoSup}>Soaps</span>
            </div>
            <div className={styles.logoSub}>AYURVEDA+SCIENCE</div>
          </Link>
        </div>

        <div className={styles.rightSection}>
          <Link href="/track" className={styles.trackShipment}>Track Shipment</Link>
          <div className={styles.icons}>
            <button className={styles.iconBtn} aria-label="Offers">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </button>
            <Link href="/checkout" className={styles.iconBtn} aria-label="Cart">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Secondary Navigation */}
      <nav className={styles.secondaryNav}>
        <ul className={styles.navList}>
          <li><Link href="/new">New Launches</Link></li>
          <li><Link href="/category">Shop By Category ⌄</Link></li>
          <li><Link href="/concern">Shop By Concern ⌄</Link></li>
          <li><Link href="/combos">Combos</Link></li>
          <li><Link href="/bulk">Bulk Order</Link></li>
        </ul>
      </nav>
    </header>
  );
}
