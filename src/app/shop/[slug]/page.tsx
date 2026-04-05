import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './ProductPage.module.css';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Mock data for now
  const product = {
    name: 'Magic Face Wash with Sandalwood & Glutathione',
    price: 549,
    originalPrice: 650,
    description: 'A magical face wash that deeply cleanses and gives you a radiant glow, blending the ancient wisdom of sandalwood with the modern brightness of glutathione. Perfect for daily use.',
    image: '/placeholder.jpg'
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageGrid}>
            <div className={styles.mainImage}>
              <div className={styles.placeholderText}>Product Image: {slug}</div>
            </div>
          </div>
          <div className={styles.productInfo}>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.pricing}>
              <span className={styles.price}>Rs. {product.price}</span>
              <span className={styles.originalPrice}>Rs. {product.originalPrice}</span>
            </div>
            <p className={styles.description}>{product.description}</p>
            
            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button className={styles.qtyBtn}>-</button>
                <input type="number" value="1" readOnly className={styles.qtyInput} />
                <button className={styles.qtyBtn}>+</button>
              </div>
              <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
