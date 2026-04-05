import Image from 'next/image';
import styles from './ProductCarousel.module.css';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <div className={styles.imagePlaceholder}>
                  Image: {product.name}
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.pricing}>
                  <span className={styles.price}>Rs. {product.price}</span>
                  {product.originalPrice && <span className={styles.originalPrice}>Rs. {product.originalPrice}</span>}
                </div>
                <button className={styles.addToCartBtn}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
