import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProductCarousel, { Product } from '@/components/ProductCarousel';

const BEST_SELLERS: Product[] = [
  { id: '1', name: 'Magic Face Wash with Sandalwood & Glutathione', price: 549, originalPrice: 650, image: '/placeholder.jpg', badge: 'Best Seller' },
  { id: '2', name: 'Magic Cream with Saffron & Niacinamide', price: 999, originalPrice: 1200, image: '/placeholder.jpg' },
  { id: '3', name: 'Kojic Acid 2% Soap with Niacinamide', price: 399, originalPrice: 499, image: '/placeholder.jpg', badge: '10% OFF' },
  { id: '4', name: 'Exfoliating Body Glove', price: 699, originalPrice: 850, image: '/placeholder.jpg' },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCarousel title="Best Sellers" products={BEST_SELLERS} />
      </main>
      <Footer />
    </>
  );
}
