import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nazar Soaps — Natural Beauty & Skincare',
    short_name: 'Nazar Soaps',
    description: 'Natural and chemical-free skincare products. Ayurveda + Science.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf6ee',
    theme_color: '#e8830c',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
