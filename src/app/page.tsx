import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import CategoryCircles from '@/components/CategoryCircles';
import ProductCarousel, { Product } from '@/components/ProductCarousel';
import ProductSpotlight from '@/components/ProductSpotlight';
import ShopByConcern from '@/components/ShopByConcern';
import Footer from '@/components/Footer';
import { createServerClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createServerClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .eq('is_best_seller', true)
    .order('created_at', { ascending: false })
    .limit(8);

  const bestSellers: Product[] = (products || []).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price ?? undefined,
    image: p.image_url || '/placeholder.jpg',
    rating: p.rating ?? undefined,
    reviews: p.review_count ?? undefined,
    soldCount: p.sold_count ?? undefined,
    description: p.short_description || p.description || undefined,
    variant: p.variant_label ?? undefined,
    badge: p.badge ?? undefined,
  }));

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee text="Bringing The Comfort of Home to Your Daily Routine." variant="orange" />
        <CategoryCircles />
        <ProductCarousel title="Shop Our Bestsellers" products={bestSellers} />
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
