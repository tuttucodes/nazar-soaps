import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const PRODUCTS: GridProduct[] = [
  { id: 't1', slug: 'magic-soap', name: 'Magic Soap (Sandal Wood & Glutathione)', price: 192, originalPrice: 210, description: 'De-tan magician soap for radiant, tan-free skin.', badge: 'Best Seller' },
  { id: 't2', slug: 'de-tan-combo', name: 'Complete De-Tan Combo', price: 899, originalPrice: 1299, description: 'Magic Soap + Face Wash + Peeling Gel — the ultimate de-tan routine.' },
  { id: 't3', slug: 'magic-face-wash', name: 'Magic Face Wash with Sandalwood & Glutathione', price: 549, originalPrice: 650, description: 'Deep cleansing face wash for a radiant, de-tanned look.' },
];

export default function TanningPage() {
  return (
    <PageShell>
      <ProductGrid title="Tanning Solutions" products={PRODUCTS} />
    </PageShell>
  );
}
