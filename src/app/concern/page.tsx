import Link from 'next/link';
import PageShell from '@/components/PageShell';
import styles from './concern.module.css';

const CONCERNS = [
  { name: 'Tanning', href: '/concern/tanning', color: '#e8a87c' },
  { name: 'Dark Spots', href: '/concern/dark-spots', color: '#c9956b' },
  { name: 'Acne', href: '/concern/acne', color: '#d4a08c' },
  { name: 'Exfoliation', href: '/concern/exfoliation', color: '#dbb89a' },
];

export default function ConcernPage() {
  return (
    <PageShell>
      <h1 className={styles.title}>Shop By Concern</h1>
      <div className={styles.grid}>
        {CONCERNS.map((c) => (
          <Link key={c.name} href={c.href} className={styles.card} style={{ backgroundColor: c.color }}>
            <span className={styles.label}>{c.name}</span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
