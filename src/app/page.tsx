import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CategoryCircles from '@/components/CategoryCircles';
import ProductCarousel, { Product } from '@/components/ProductCarousel';
import Marquee from '@/components/Marquee';

const BEST_SELLERS: Product[] = [
  { 
    id: '1', 
    name: 'MAGIC SOAP (SANDAL WOOD AND...', 
    shortDesc: 'Watch those tan lines vanish with me every day! I\'m your De-tan Magician,...',
    price: 192, 
    originalPrice: 210, 
    discountPercentage: 9,
    rating: 4.7,
    reviews: '4,351',
    soldText: '10L+ Sold Out!!',
    urgencyText: '02m : 46s',
    urgencyColor: '#e66e28',
    image: '/p1.jpg',
  },
  { 
    id: '2', 
    name: 'ROCKSTAR ADVANCED HAIR GROWT...', 
    shortDesc: 'I\'m the Comeback Track of your hair growth...',
    price: 499, 
    originalPrice: 777,
    discountPercentage: 36,
    rating: 4.5,
    reviews: '1,234',
    soldText: 'Hurry! Limited Stock Only',
    image: '/p2.jpg',
    badge: 'NEW'
  },
  { 
    id: '3', 
    name: 'MAGIC PEELING GEL', 
    shortDesc: 'I\'m the Natural replacement for those AHA, BHA & PHA chemical peeling...',
    price: 299, 
    originalPrice: 499, 
    discountPercentage: 40,
    rating: 4.8,
    reviews: '8,901',
    urgencyText: '987 Left Only!!',
    urgencyColor: '#d66',
    image: '/p3.jpg'
  },
  { 
    id: '4', 
    name: 'CLEAN-UP KIT', 
    shortDesc: 'Ghar Soaps, in collaboration with Koparo, brings you a thoughtfully curated kit...',
    price: 599, 
    originalPrice: 799,
    discountPercentage: 25,
    rating: 4.9,
    reviews: '567',
    soldText: '300+ Sold out',
    image: '/p4.jpg'
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryCircles />
        <ProductCarousel title="Shop Our Bestsellers" products={BEST_SELLERS} />
        
        {/* Placeholder for Shop By Concern */}
        <section style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "#fdfaf5" }}>
          <h2 style={{ fontFamily: "var(--font-oswald)", fontSize: "2.5rem", marginBottom: "2rem", textTransform: "uppercase" }}>Shop By Concern</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto" }}>
             {['Tanning', 'Dark spots', 'Acne', 'Exfoliation'].map(concern => (
               <div key={concern} style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                 <div style={{ width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "#e2ccb8", border: "1px solid #ddd", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}></div>
                 <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "1.2rem", fontWeight: 800 }}>{concern}</h3>
               </div>
             ))}
          </div>
        </section>

        {/* Secondary Banner Mock */}
        <section style={{ padding: "4rem 2rem", backgroundColor: "#fdfaf5", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "1300px", minHeight: "350px", backgroundColor: "#3f3acc", display: "flex", color: "#fff", flexWrap: "wrap", overflow: "hidden" }}>
            <div style={{ flex: 1, padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem", minWidth: "300px" }}>
               <span style={{ backgroundColor: "#fff", color: "#3f3acc", padding: "0.25rem 1rem", borderRadius: "50px", alignSelf: "flex-start", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase" }}>New Launch</span>
               <h2 style={{ fontSize: "4rem", fontFamily: "var(--font-oswald)", margin: 0, lineHeight: 1, color: "#ffcc00", textShadow: "2px 2px 0px #000" }}>ROCKSTAR</h2>
               <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-inter)", fontWeight: 800, textTransform: "uppercase", color: "#ffcc00", letterSpacing: "1px", textShadow: "1px 1px 0px #000" }}>Blue Pea Hair Growth Serum</h3>
            </div>
            <div style={{ flex: 1, padding: "4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem", minWidth: "300px", backgroundColor: "#fdfaf5", color: "#111" }}>
               <h4 style={{ fontSize: "1.5rem", fontFamily: "var(--font-oswald)", fontWeight: 600 }}>Meet your Comeback Track of Hair Growth!</h4>
               <p style={{ fontFamily: "var(--font-inter)", lineHeight: 1.6, fontSize: "1rem", color: "#444" }}>Powered with 4% Anagain, 3% Redensyl, 2% Baicapil & Blue Pea, it helps reactivate hair growth, improve density, and reduce hair fall — with a unique Precision Pump that targets the roots directly.</p>
               <button style={{ backgroundColor: "#fff", color: "#000", width: "150px", padding: "0.75rem 2rem", borderRadius: "30px", fontWeight: "700", border: "1px solid #111", fontSize: "1rem", transition: "0.2s" }}>Buy Now</button>
            </div>
          </div>
        </section>

        <Marquee text="Discover the gentle touch of nature in every bar" backgroundColor="var(--accent)" textColor="#000" />
      </main>
      <Footer />
    </>
  );
}
