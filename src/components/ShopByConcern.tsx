import Link from 'next/link';
import styles from './ShopByConcern.module.css';

const CONCERNS = [
  { name: 'Tanning', href: '/concern/tanning', color: '#e8a87c' },
  { name: 'Dark Spots', href: '/concern/dark-spots', color: '#c9956b' },
  { name: 'Acne', href: '/concern/acne', color: '#d4a08c' },
  { name: 'Exfoliation', href: '/concern/exfoliation', color: '#dbb89a' },
];

export default function ShopByConcern() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop By Concern</h2>
      <div className={styles.grid}>
        {CONCERNS.map((concern) => (
          <Link key={concern.name} href={concern.href} className={styles.item}>
            <div className={styles.circle} style={{ backgroundColor: concern.color }}>
              <span className={styles.placeholder}>{concern.name[0]}</span>
            </div>
            <span className={styles.label}>{concern.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
