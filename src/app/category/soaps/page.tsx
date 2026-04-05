import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const SOAPS: GridProduct[] = [
  { id: 's1', slug: 'magic-soap', name: 'Magic Soap (Sandal Wood & Glutathione)', price: 192, originalPrice: 210, description: 'De-tan magician soap for radiant, tan-free skin.', badge: 'Best Seller' },
  { id: 's2', slug: 'kojic-acid-soap', name: 'Kojic Acid 2% Soap with Niacinamide', price: 399, originalPrice: 499, description: 'Brightening soap that targets dark spots and uneven tone.' },
  { id: 's3', slug: 'charcoal-soap', name: 'Activated Charcoal Detox Soap', price: 249, originalPrice: 349, description: 'Deep cleansing charcoal soap that draws out impurities.', badge: 'Popular' },
  { id: 's4', slug: 'turmeric-soap', name: 'Turmeric & Saffron Glow Soap', price: 229, originalPrice: 299, description: 'Traditional turmeric blend for a natural golden glow.' },
  { id: 's5', slug: 'neem-soap', name: 'Neem & Tea Tree Anti-Acne Soap', price: 219, originalPrice: 279, description: 'Antibacterial soap that fights acne and blemishes.' },
  { id: 's6', slug: 'rose-soap', name: 'Rose & Glycerin Moisturizing Soap', price: 199, originalPrice: 249, description: 'Gentle moisturizing soap with rose extracts for soft skin.' },
];

export default function SoapsPage() {
  return (
    <PageShell>
      <ProductGrid title="Best Bathing Soaps" products={SOAPS} />
    </PageShell>
  );
}
