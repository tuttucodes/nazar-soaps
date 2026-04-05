import PageShell from '@/components/PageShell';
import ProductGrid, { GridProduct } from '@/components/ProductGrid';
import { createServerClient } from '@/lib/supabase/server';

export default async function FacePage() {
  const supabase = await createServerClient();
  const { data: category } = await supabase.from('categories').select('id').eq('slug', 'face').single();
  const { data: products } = category
    ? await supabase.from('products').select('*').eq('status', 'active').eq('category_id', category.id).order('created_at', { ascending: false })
    : { data: [] };

  const items: GridProduct[] = (products || []).map(p => ({
    id: p.id, slug: p.slug, name: p.name, price: p.price,
    originalPrice: p.original_price ?? undefined,
    description: p.short_description || undefined,
    badge: p.badge ?? undefined,
  }));

  return (
    <PageShell>
      <ProductGrid title="Face Care" products={items} />
    </PageShell>
  );
}
