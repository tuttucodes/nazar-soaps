import type { MetadataRoute } from 'next';
import { createServerClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerClient();
  const baseUrl = 'https://nazarsoaps.com';

  const [{ data: products }, { data: categories }, { data: concerns }] = await Promise.all([
    supabase.from('products').select('slug, updated_at').eq('status', 'active'),
    supabase.from('categories').select('slug'),
    supabase.from('concerns').select('slug'),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/new-launches`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/combos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/category`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/concern`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/bulk-order`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/track`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/returns`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const productPages: MetadataRoute.Sitemap = (products || []).map(p => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map(c => ({
    url: `${baseUrl}/category/${c.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const concernPages: MetadataRoute.Sitemap = (concerns || []).map(c => ({
    url: `${baseUrl}/concern/${c.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...concernPages];
}
