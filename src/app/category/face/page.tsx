import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const FACE_PRODUCTS: GridProduct[] = [
  { id: 'f1', slug: 'magic-face-wash', name: 'Magic Face Wash with Sandalwood & Glutathione', price: 549, originalPrice: 650, description: 'Deep cleansing face wash for a radiant, de-tanned look.', badge: 'Best Seller' },
  { id: 'f2', slug: 'magic-cream', name: 'Magic Cream with Saffron & Niacinamide', price: 999, originalPrice: 1200, description: 'Luxurious face cream for brightening and hydration.' },
  { id: 'f3', slug: 'magic-peeling-gel', name: 'Magic Peeling Gel', price: 299, originalPrice: 499, description: 'Natural replacement for AHA, BHA & PHA chemical peeling.' },
  { id: 'f4', slug: 'vitamin-c-serum', name: 'Vitamin C Brightening Serum', price: 599, originalPrice: 799, description: 'Potent vitamin C serum for dark spots and dull skin.' },
  { id: 'f5', slug: 'sunscreen-spf50', name: 'Sunscreen SPF 50+ PA++++', price: 449, originalPrice: 599, description: 'Lightweight, non-greasy sunscreen with broad spectrum protection.' },
  { id: 'f6', slug: 'under-eye-cream', name: 'Under Eye Dark Circle Cream', price: 399, originalPrice: 549, description: 'Targets dark circles, puffiness and fine lines.' },
];

export default function FacePage() {
  return (
    <PageShell>
      <ProductGrid title="Face Care" products={FACE_PRODUCTS} />
    </PageShell>
  );
}
