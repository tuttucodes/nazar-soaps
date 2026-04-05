import PageShell from '@/components/PageShell';
import styles from './returns.module.css';

export default function ReturnsPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Returns & Refunds</h1>

        <div className={styles.section}>
          <h2>Return Policy</h2>
          <p>At Nazar Soaps, we want you to be completely satisfied with your purchase. If you are not happy with your order, you may return unused and unopened products within <strong>7 days</strong> of delivery.</p>
        </div>

        <div className={styles.section}>
          <h2>How to Initiate a Return</h2>
          <ol className={styles.steps}>
            <li>Email us at <strong>returns@nazarsoaps.com</strong> with your order ID and reason for return.</li>
            <li>Our team will review your request and provide return instructions within 24 hours.</li>
            <li>Pack the product securely in its original packaging and ship it back.</li>
            <li>Once we receive and inspect the product, your refund will be processed.</li>
          </ol>
        </div>

        <div className={styles.section}>
          <h2>Refund Timeline</h2>
          <ul className={styles.list}>
            <li><strong>Prepaid orders:</strong> Refund will be credited to your original payment method within 5-7 business days.</li>
            <li><strong>COD orders:</strong> Refund will be transferred via bank transfer within 7-10 business days.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Non-Returnable Items</h2>
          <ul className={styles.list}>
            <li>Opened or used products</li>
            <li>Products without original packaging</li>
            <li>Items purchased during flash sales or clearance events</li>
            <li>Gift cards</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Damaged or Defective Products</h2>
          <p>If you receive a damaged or defective product, please contact us within 48 hours of delivery with photos of the damage. We will arrange a free replacement or full refund at no additional cost to you.</p>
        </div>
      </div>
    </PageShell>
  );
}
