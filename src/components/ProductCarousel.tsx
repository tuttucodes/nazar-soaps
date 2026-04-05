import Image from 'next/image';
import styles from './ProductCarousel.module.css';

export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  rating: number;
  reviews: string;
  soldText?: string;
  urgencyText?: string;
  urgencyColor?: string; // e.g. "orange" or "red"
  badge?: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.container}>
        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <div className={styles.imagePlaceholder}>
                  {product.name} Image
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.productName}>{product.name}</h3>
                
                <div className={styles.reviewLine}>
                  <span className={styles.rating}>⭐ {product.rating}</span>
                  <span className={styles.reviews}>☑ {product.reviews} Reviews</span>
                  {product.soldText && (
                    <span className={styles.soldText}>| {product.soldText}</span>
                  )}
                </div>

                <p className={styles.desc}>{product.shortDesc}</p>
                
                <select className={styles.variantSelect}>
                  <option>Pack of 1 ({product.discountPercentage}% off)</option>
                </select>

                {product.urgencyText && (
                  <div className={styles.urgencyBar} style={{ backgroundColor: product.urgencyColor || '#e66e28' }}>
                    {product.urgencyText}
                  </div>
                )}
                
                <div className={styles.pricing}>
                  {product.originalPrice && <span className={styles.originalPrice}>Rs. {product.originalPrice}</span>}
                  <span className={styles.price}>Rs. {product.price}</span>
                  {product.discountPercentage && <span className={styles.discount}>({product.discountPercentage}% off)</span>}
                </div>
              </div>
              
              <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
