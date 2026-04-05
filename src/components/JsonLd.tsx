interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Nazar Soaps",
      url: "https://nazarsoaps.com",
      logo: "https://nazarsoaps.com/logo.png",
      description: "Natural and chemical-free skincare products combining Ayurveda with modern science.",
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "support@nazarsoaps.com" },
      sameAs: ["https://instagram.com/nazarsoaps", "https://facebook.com/nazarsoaps"],
    }} />
  );
}

export function WebsiteSchema() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Nazar Soaps",
      url: "https://nazarsoaps.com",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://nazarsoaps.com/shop?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    }} />
  );
}

export function ProductSchema({ product }: { product: { name: string; description?: string | null; price: number; original_price?: number | null; slug: string; image_url?: string | null; rating?: number | null; review_count?: number; stock_quantity?: number } }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description || "",
      image: product.image_url || "https://nazarsoaps.com/placeholder.jpg",
      url: `https://nazarsoaps.com/shop/${product.slug}`,
      brand: { "@type": "Brand", name: "Nazar Soaps" },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: (product.stock_quantity ?? 1) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: `https://nazarsoaps.com/shop/${product.slug}`,
      },
      ...(product.rating ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.review_count || 0,
        },
      } : {}),
    }} />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }} />
  );
}
