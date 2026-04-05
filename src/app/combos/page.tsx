import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const COMBOS: GridProduct[] = [
  { id: 'c1', slug: 'clean-up-kit', name: 'Clean-Up Kit', price: 599, originalPrice: 799, description: 'A thoughtfully curated kit for a complete clean-up routine at home.', badge: '25% Off' },
  { id: 'c2', slug: 'de-tan-combo', name: 'Complete De-Tan Combo', price: 899, originalPrice: 1299, description: 'Magic Soap + Face Wash + Peeling Gel — the ultimate de-tan routine.' },
  { id: 'c3', slug: 'glow-routine', name: 'Daily Glow Routine Set', price: 1499, originalPrice: 2100, description: 'Face wash, serum, cream & sunscreen for an all-day radiant look.', badge: 'Value Pack' },
  { id: 'c4', slug: 'family-pack', name: 'Family Soap Pack (6 Bars)', price: 999, originalPrice: 1260, description: 'Assorted pack of 6 soaps — perfect for the whole family.' },
  { id: 'c5', slug: 'hair-care-duo', name: 'Hair Care Duo', price: 799, originalPrice: 1050, description: 'Rockstar Hair Serum + Nourishing Hair Oil for complete hair care.' },
  { id: 'c6', slug: 'bridal-glow-kit', name: 'Bridal Glow Kit', price: 2499, originalPrice: 3500, description: 'Complete skincare kit for brides — face, body and hair care essentials.', badge: 'Premium' },
];

export default function CombosPage() {
  return (
    <PageShell>
      <ProductGrid title="Combos" products={COMBOS} />
    </PageShell>
  );
}
