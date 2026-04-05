import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';
import { createServerClient } from '@/lib/supabase/server';

export default async function TanningPage() {
  const supabase = await createServerClient();
  const { data: concern } = await supabase.from('concerns').select('id').eq('slug', 'tanning').single();
  let products: GridProduct[] = [];
  if (concern) {
    const { data: links } = await supabase.from('product_concerns').select('product_id').eq('concern_id', concern.id);
    if (links && links.length > 0) {
      const ids = links.map(l => l.product_id);
      const { data } = await supabase.from('products').select('*').eq('status', 'active').in('id', ids);
      products = (data || []).map(p => ({
        id: p.id, slug: p.slug, name: p.name, price: p.price,
        originalPrice: p.original_price ?? undefined,
        description: p.short_description || undefined,
        badge: p.badge ?? undefined,
      }));
    }
  }

  return (
    <PageShell>
      <ProductGrid title="Tanning Solutions" products={products} />
    </PageShell>
  );
}
