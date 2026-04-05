import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';

const ALL_PRODUCTS: GridProduct[] = [
  { id: 'a1', slug: 'magic-soap', name: 'Magic Soap (Sandal Wood & Glutathione)', price: 192, originalPrice: 210, description: 'De-tan magician soap for radiant, tan-free skin.', badge: 'Best Seller' },
  { id: 'a2', slug: 'rockstar-serum', name: 'Rockstar Advanced Hair Growth Serum', price: 499, originalPrice: 777, description: 'India\'s 1st Blue Pea powered hair growth serum.' },
  { id: 'a3', slug: 'magic-peeling-gel', name: 'Magic Peeling Gel', price: 299, originalPrice: 499, description: 'Natural replacement for AHA, BHA & PHA chemical peeling.' },
  { id: 'a4', slug: 'clean-up-kit', name: 'Clean-Up Kit', price: 599, originalPrice: 799, description: 'A thoughtfully curated kit for a complete clean-up routine.' },
  { id: 'a5', slug: 'magic-face-wash', name: 'Magic Face Wash with Sandalwood & Glutathione', price: 549, originalPrice: 650, description: 'Deep cleansing face wash for a radiant, de-tanned look.' },
  { id: 'a6', slug: 'magic-cream', name: 'Magic Cream with Saffron & Niacinamide', price: 999, originalPrice: 1200, description: 'Luxurious face cream for brightening and hydration.' },
  { id: 'a7', slug: 'kojic-acid-soap', name: 'Kojic Acid 2% Soap with Niacinamide', price: 399, originalPrice: 499, description: 'Brightening soap for dark spots and uneven tone.' },
  { id: 'a8', slug: 'charcoal-soap', name: 'Activated Charcoal Detox Soap', price: 249, originalPrice: 349, description: 'Deep cleansing charcoal soap that draws out impurities.' },
  { id: 'a9', slug: 'body-lotion', name: 'Cocoa Butter Body Lotion', price: 449, originalPrice: 599, description: 'Rich moisturizing lotion with cocoa butter for silky smooth skin.' },
  { id: 'a10', slug: 'vitamin-c-serum', name: 'Vitamin C Brightening Serum', price: 599, originalPrice: 799, description: 'Potent vitamin C serum for dark spots and dull skin.' },
  { id: 'a11', slug: 'sunscreen-spf50', name: 'Sunscreen SPF 50+ PA++++', price: 449, originalPrice: 599, description: 'Lightweight, non-greasy sunscreen with broad spectrum protection.' },
  { id: 'a12', slug: 'turmeric-soap', name: 'Turmeric & Saffron Glow Soap', price: 229, originalPrice: 299, description: 'Traditional turmeric blend for a natural golden glow.' },
];

export default function ShopPage() {
  return (
    <PageShell>
      <ProductGrid title="Shop All" products={ALL_PRODUCTS} />
    </PageShell>
  );
}
