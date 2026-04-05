import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import CategoryCircles from '@/components/CategoryCircles';
import ProductCarousel, { Product } from '@/components/ProductCarousel';
import ProductSpotlight from '@/components/ProductSpotlight';
import ShopByConcern from '@/components/ShopByConcern';
import Footer from '@/components/Footer';

const BEST_SELLERS: Product[] = [
  {
    id: '1',
    name: 'Magic Soap (Sandal Wood and Glutathione)',
    price: 192,
    originalPrice: 210,
    image: '/placeholder.jpg',
    rating: 4.7,
    reviews: 4351,
    soldCount: '10L+ Sold Out!!',
    description: 'Watch those tan lines vanish with me every day! I\'m your De-tan Magician,...',
    variant: 'Pack of 1 (9% off)',
  },
  {
    id: '2',
    name: 'Rockstar Advanced Hair Growth Serum',
    price: 499,
    originalPrice: 777,
    image: '/placeholder.jpg',
    badge: 'Hurry! Limited Stock Only',
    description: 'I\'m the Comeback Track of your hair growth....',
  },
  {
    id: '3',
    name: 'Magic Peeling Gel',
    price: 299,
    originalPrice: 499,
    image: '/placeholder.jpg',
    badge: '987 Left Only!!',
    description: 'I\'m the Natural replacement for those AHA, BHA & PHA chemical peeling...',
    variant: 'Magic Peeling Gel (40% off)',
  },
  {
    id: '4',
    name: 'Clean-Up Kit',
    price: 599,
    originalPrice: 799,
    image: '/placeholder.jpg',
    badge: '300+ Sold out',
    description: 'Nazar Soaps, in collaboration with Koparo, brings you a thoughtfully curated kit...',
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee text="Bringing The Comfort of Home to Your Daily Routine." variant="orange" />
        <CategoryCircles />
        <ProductCarousel title="Shop Our Bestsellers" products={BEST_SELLERS} />
        <ProductSpotlight
          badge="New Launch"
          name="Rockstar Blue Pea Hair Growth Serum"
          tagline="Meet your Comeback Track of Hair Growth!"
          description="Powered with 4% Anagain, 3% Redensyl, 2% Baicapil & Blue Pea, it helps reactivate hair growth, improve density, and reduce hair fall — with a unique Precision Pump that targets the roots directly."
          bgColor="#1a237e"
        />
        <Marquee text="Discover the gentle touch of nature in every bar" />
        <ShopByConcern />
      </main>
      <Footer />
    </>
  );
}
