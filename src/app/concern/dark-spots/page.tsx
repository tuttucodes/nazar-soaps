import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const PRODUCTS: GridProduct[] = [
  { id: 'd1', slug: 'kojic-acid-soap', name: 'Kojic Acid 2% Soap with Niacinamide', price: 399, originalPrice: 499, description: 'Brightening soap that targets dark spots and uneven tone.', badge: 'Popular' },
  { id: 'd2', slug: 'vitamin-c-serum', name: 'Vitamin C Brightening Serum', price: 599, originalPrice: 799, description: 'Potent vitamin C serum for dark spots and dull skin.' },
  { id: 'd3', slug: 'magic-cream', name: 'Magic Cream with Saffron & Niacinamide', price: 999, originalPrice: 1200, description: 'Luxurious face cream for brightening and hydration.' },
];

export default function DarkSpotsPage() {
  return (
    <PageShell>
      <ProductGrid title="Dark Spots Solutions" products={PRODUCTS} />
    </PageShell>
  );
}
