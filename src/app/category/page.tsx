import Link from 'next/link';
import PageShell from '@/components/PageShell';
import styles from './category.module.css';

const CATEGORIES = [
  { name: 'Soaps', href: '/category/soaps', color: '#d4b896' },
  { name: 'Face Care', href: '/category/face', color: '#e8a87c' },
  { name: 'Body Care', href: '/category/body', color: '#c9956b' },
];

export default function CategoryPage() {
  return (
    <PageShell>
      <h1 className={styles.title}>Shop By Category</h1>
      <div className={styles.grid}>
        {CATEGORIES.map((cat) => (
          <Link key={cat.name} href={cat.href} className={styles.card} style={{ backgroundColor: cat.color }}>
            <span className={styles.label}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
