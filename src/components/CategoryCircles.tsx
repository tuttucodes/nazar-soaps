import Link from 'next/link';
import styles from './CategoryCircles.module.css';

const CATEGORIES = [
  { name: 'Soaps', href: '/category/soaps', icon: 'soap' },
  { name: 'Face', href: '/category/face', icon: 'face' },
  { name: 'Body', href: '/category/body', icon: 'body' },
  { name: 'Best Sellers', href: '/category/best-sellers', icon: 'star' },
  { name: 'New Launch', href: '/new-launches', icon: 'new' },
];

function CategoryIcon({ type }: { type: string }) {
  switch (type) {
    case 'soap':
      return (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="14" y="20" width="36" height="24" rx="4" />
          <circle cx="20" cy="18" r="4" />
          <circle cx="28" cy="14" r="3" />
          <circle cx="24" cy="20" r="2" />
          <path d="M32 28 L36 36 M28 30 L26 36" />
        </svg>
      );
    case 'face':
      return (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="28" r="14" />
          <path d="M22 24 Q24 22 26 24" />
          <path d="M38 24 Q40 22 42 24" />
          <path d="M28 34 Q32 38 36 34" />
          <path d="M18 20 Q14 12 20 8" />
          <path d="M46 20 Q50 12 44 8" />
          <path d="M24 46 L24 52 M40 46 L40 52" />
          <path d="M28 14 Q32 10 36 14" />
        </svg>
      );
    case 'body':
      return (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 10 L32 50" />
          <path d="M26 14 Q32 8 38 14" />
          <path d="M22 22 Q32 16 42 22" />
          <path d="M20 32 Q32 26 44 32" />
          <path d="M22 42 Q32 36 42 42" />
          <path d="M26 50 Q32 46 38 50" />
        </svg>
      );
    case 'star':
      return (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="20" />
          <polygon points="32,16 36,26 46,26 38,32 40,42 32,36 24,42 26,32 18,26 28,26" />
        </svg>
      );
    case 'new':
      return (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M32 8 L38 24 L54 24 L42 34 L46 50 L32 40 L18 50 L22 34 L10 24 L26 24 Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CategoryCircles() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {CATEGORIES.map((cat) => (
          <Link key={cat.name} href={cat.href} className={styles.category}>
            <div className={styles.circle}>
              <CategoryIcon type={cat.icon} />
            </div>
            <span className={styles.label}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
