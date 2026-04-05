import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const PRODUCTS: GridProduct[] = [
  { id: 'a1', slug: 'neem-soap', name: 'Neem & Tea Tree Anti-Acne Soap', price: 219, originalPrice: 279, description: 'Antibacterial soap that fights acne and blemishes.', badge: 'For Acne' },
  { id: 'a2', slug: 'charcoal-soap', name: 'Activated Charcoal Detox Soap', price: 249, originalPrice: 349, description: 'Deep cleansing charcoal soap that draws out impurities.' },
  { id: 'a3', slug: 'aha-bha-toner', name: 'AHA BHA Exfoliating Toner', price: 449, originalPrice: 599, description: 'Gentle exfoliating toner that unclogs pores and smooths texture.' },
];

export default function AcnePage() {
  return (
    <PageShell>
      <ProductGrid title="Acne Solutions" products={PRODUCTS} />
    </PageShell>
  );
}
