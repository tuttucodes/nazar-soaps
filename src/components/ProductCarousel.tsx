import styles from './ProductCarousel.module.css';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  soldCount?: string;
  description?: string;
  variant?: string;
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
          {products.map(product => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {product.badge && <span className={styles.badge}>{product.badge}</span>}
                  <div className={styles.imagePlaceholder}>
                    {product.name}
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.productName}>{product.name}</h3>

                  {product.rating && (
                    <div className={styles.ratingRow}>
                      <span className={styles.star}>&#9733;</span>
                      <span className={styles.ratingValue}>{product.rating}</span>
                      {product.reviews && (
                        <span className={styles.reviews}>{product.reviews.toLocaleString()} Reviews</span>
                      )}
                      {product.soldCount && (
                        <>
                          <span className={styles.divider}>|</span>
                          <span className={styles.soldOut}>{product.soldCount}</span>
                        </>
                      )}
                    </div>
                  )}

                  {product.description && (
                    <p className={styles.description}>{product.description}</p>
                  )}

                  {product.variant && (
                    <select className={styles.variantSelect} defaultValue={product.variant}>
                      <option>{product.variant}</option>
                    </select>
                  )}

                  <div className={styles.pricing}>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>Rs. {product.originalPrice}</span>
                    )}
                    <span className={styles.price}>Rs. {product.price}</span>
                    {discount > 0 && (
                      <span className={styles.discount}>({discount}% off)</span>
                    )}
                  </div>
                  <button className={styles.addToCartBtn}>Add to Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
