import Link from 'next/link';
import styles from './CategoryCircles.module.css';

const CATEGORIES = [
  { name: 'Soaps', href: '/soaps' }, 
  { name: 'Face', href: '/face' },
  { name: 'Body', href: '/body' },
  { name: 'Best sellers', href: '/bestsellers' },
  { name: 'New Launch', href: '/new-launch' },
];

export default function CategoryCircles() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {CATEGORIES.map(cat => (
          <Link href={cat.href} key={cat.name} className={styles.link}>
            <div className={styles.circle}>
              {/* placeholder for SVG or Icon component */}
            </div>
            <span className={styles.label}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
