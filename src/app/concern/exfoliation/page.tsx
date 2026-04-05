import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const PRODUCTS: GridProduct[] = [
  { id: 'e1', slug: 'magic-peeling-gel', name: 'Magic Peeling Gel', price: 299, originalPrice: 499, description: 'Natural replacement for AHA, BHA & PHA chemical peeling.', badge: 'Best Seller' },
  { id: 'e2', slug: 'body-scrub', name: 'Coffee & Walnut Body Scrub', price: 399, originalPrice: 549, description: 'Exfoliating scrub that removes dead skin and boosts circulation.' },
  { id: 'e3', slug: 'exfoliating-glove', name: 'Exfoliating Body Glove', price: 699, originalPrice: 850, description: 'Premium exfoliating glove for smooth, polished skin.' },
];

export default function ExfoliationPage() {
  return (
    <PageShell>
      <ProductGrid title="Exfoliation Products" products={PRODUCTS} />
    </PageShell>
  );
}
