import Link from 'next/link';
import styles from './ProductGrid.module.css';

export interface GridProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  badge?: string;
}

interface ProductGridProps {
  title: string;
  products: GridProduct[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.grid}>
        {products.map((p) => {
          const discount = p.originalPrice
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
            : 0;
          return (
            <Link key={p.id} href={`/shop/${p.slug}`} className={styles.card}>
              <div className={styles.imageArea}>
                {p.badge && <span className={styles.badge}>{p.badge}</span>}
                <span className={styles.placeholder}>{p.name}</span>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{p.name}</h3>
                {p.description && <p className={styles.desc}>{p.description}</p>}
                <div className={styles.pricing}>
                  {p.originalPrice && (
                    <span className={styles.original}>Rs. {p.originalPrice}</span>
                  )}
                  <span className={styles.price}>Rs. {p.price}</span>
                  {discount > 0 && (
                    <span className={styles.discount}>({discount}% off)</span>
                  )}
                </div>
                <button className={styles.addBtn}>Add to Cart</button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
