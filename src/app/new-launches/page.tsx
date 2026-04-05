import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const NEW_LAUNCHES: GridProduct[] = [
  { id: 'n1', slug: 'rockstar-serum', name: 'Rockstar Advanced Hair Growth Serum', price: 499, originalPrice: 777, description: 'India\'s 1st Blue Pea powered hair growth serum with 4% Anagain & 3% Redensyl.', badge: 'New Launch' },
  { id: 'n2', slug: 'retinol-night-cream', name: 'Retinol 0.5% Night Repair Cream', price: 799, originalPrice: 999, description: 'Advanced night cream with encapsulated retinol for anti-aging.', badge: 'New Launch' },
  { id: 'n3', slug: 'aha-bha-toner', name: 'AHA BHA Exfoliating Toner', price: 449, originalPrice: 599, description: 'Gentle exfoliating toner that unclogs pores and smooths texture.', badge: 'New Launch' },
  { id: 'n4', slug: 'lip-balm-set', name: 'Tinted Lip Balm Set (3 shades)', price: 349, originalPrice: 499, description: 'Moisturizing lip balms with natural tint in Rose, Berry & Nude.', badge: 'New Launch' },
];

export default function NewLaunchesPage() {
  return (
    <PageShell>
      <ProductGrid title="New Launches" products={NEW_LAUNCHES} />
    </PageShell>
  );
}
