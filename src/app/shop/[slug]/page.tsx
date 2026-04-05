import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createServerClient } from '@/lib/supabase/server';
import { ProductSchema, BreadcrumbSchema } from '@/components/JsonLd';
import styles from './ProductPage.module.css';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerClient();
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).eq('status', 'active').single();
  if (!product) return { title: 'Product Not Found | Nazar Soaps' };
  return {
    title: product.seo_title || `${product.name} | Nazar Soaps`,
    description: product.seo_description || product.short_description || product.description || '',
    openGraph: { title: product.name, description: product.short_description || '', images: product.image_url ? [product.image_url] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerClient();
  const { data: product } = await supabase.from('products').select('*, categories(name, slug)').eq('slug', slug).eq('status', 'active').single();

  if (!product) notFound();

  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://nazarsoaps.com" },
        { name: "Shop", url: "https://nazarsoaps.com/shop" },
        { name: product.name, url: `https://nazarsoaps.com/shop/${product.slug}` },
      ]} />
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageGrid}>
            <div className={styles.mainImage}>
              <div className={styles.placeholderText}>{product.name}</div>
            </div>
          </div>
          <div className={styles.productInfo}>
            {product.badge && <span style={{ display: "inline-block", background: "#e8830c", color: "#fff", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.5rem" }}>{product.badge}</span>}
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.pricing}>
              <span className={styles.price}>Rs. {product.price}</span>
              {product.original_price && <span className={styles.originalPrice}>Rs. {product.original_price}</span>}
              {discount > 0 && <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.9rem" }}>({discount}% off)</span>}
            </div>
            {product.variant_label && <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>{product.variant_label}</p>}
            {product.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.5rem 0" }}>
                <span style={{ color: "#f59e0b", fontWeight: 700 }}>{"★".repeat(Math.round(product.rating))}</span>
                <span style={{ fontSize: "0.85rem", color: "#666" }}>{product.rating} ({product.review_count} reviews)</span>
              </div>
            )}
            {product.sold_count && <p style={{ fontSize: "0.82rem", color: "#e8830c", fontWeight: 600 }}>{product.sold_count}</p>}
            <p className={styles.description}>{product.description || product.short_description}</p>

            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button className={styles.qtyBtn}>-</button>
                <input type="number" defaultValue="1" readOnly className={styles.qtyInput} />
                <button className={styles.qtyBtn}>+</button>
              </div>
              <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
            {product.stock_quantity <= product.low_stock_threshold && product.stock_quantity > 0 && (
              <p style={{ color: "#dc2626", fontSize: "0.82rem", fontWeight: 600, marginTop: "0.5rem" }}>Only {product.stock_quantity} left in stock!</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
