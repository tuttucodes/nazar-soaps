import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';
import { createServerClient } from '@/lib/supabase/server';

export default async function ShopPage() {
  const supabase = await createServerClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  const items: GridProduct[] = (products || []).map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price ?? undefined,
    description: p.short_description || undefined,
    badge: p.badge ?? undefined,
  }));

  return (
    <PageShell>
      <ProductGrid title="Shop All" products={items} />
    </PageShell>
  );
}
