import PageShell from '@/components/PageShell';
import styles from './faq.module.css';

const FAQS = [
  { q: 'Are Nazar Soaps products 100% natural?', a: 'Yes! All our products are made with natural, Ayurvedic ingredients combined with scientifically proven actives. We never use harmful chemicals like parabens, sulfates, or artificial fragrances.' },
  { q: 'How long does shipping take?', a: 'We typically deliver within 3-7 business days across India. Metro cities usually receive orders within 3-4 days. You can track your order using the Track Shipment page.' },
  { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping on all prepaid orders across India. Cash on delivery orders may have a small additional charge.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day return policy on unused and unopened products. If you receive a damaged product, we will replace it free of charge. Please visit our Returns & Refunds page for more details.' },
  { q: 'Are your products suitable for sensitive skin?', a: 'Most of our products are formulated to be gentle on all skin types including sensitive skin. However, we recommend doing a patch test before first use. Check individual product pages for specific skin type recommendations.' },
  { q: 'Do you offer bulk orders or wholesale pricing?', a: 'Yes! We offer special pricing for bulk orders. Please visit our Bulk Orders page or email us at bulk@nazarsoaps.com for custom quotes.' },
  { q: 'How should I store the products?', a: 'Store products in a cool, dry place away from direct sunlight. Keep soaps dry between uses for longer lasting results. Serums and creams should be tightly sealed after each use.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 24 hours of placing them. Once shipped, cancellation is not possible but you can initiate a return after delivery.' },
];

export default function FAQPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <details key={i} className={styles.item}>
              <summary className={styles.question}>{faq.q}</summary>
              <p className={styles.answer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
