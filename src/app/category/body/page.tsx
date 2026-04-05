import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const BODY_PRODUCTS: GridProduct[] = [
  { id: 'b1', slug: 'body-lotion', name: 'Cocoa Butter Body Lotion', price: 449, originalPrice: 599, description: 'Rich moisturizing lotion with cocoa butter for silky smooth skin.', badge: 'Best Seller' },
  { id: 'b2', slug: 'body-scrub', name: 'Coffee & Walnut Body Scrub', price: 399, originalPrice: 549, description: 'Exfoliating scrub that removes dead skin and boosts circulation.' },
  { id: 'b3', slug: 'body-oil', name: 'Almond & Jojoba Body Oil', price: 549, originalPrice: 699, description: 'Lightweight nourishing oil for deep hydration and glow.' },
  { id: 'b4', slug: 'body-wash', name: 'Honey & Oat Moisturizing Body Wash', price: 349, originalPrice: 449, description: 'Gentle body wash that cleanses without stripping moisture.' },
  { id: 'b5', slug: 'exfoliating-glove', name: 'Exfoliating Body Glove', price: 699, originalPrice: 850, description: 'Premium exfoliating glove for smooth, polished skin.' },
  { id: 'b6', slug: 'foot-cream', name: 'Cracked Heel Repair Foot Cream', price: 299, originalPrice: 399, description: 'Intensive foot cream that repairs and softens cracked heels.' },
];

export default function BodyPage() {
  return (
    <PageShell>
      <ProductGrid title="Body Care" products={BODY_PRODUCTS} />
    </PageShell>
  );
}
