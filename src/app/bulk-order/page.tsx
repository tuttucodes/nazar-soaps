import PageShell from '@/components/PageShell';
import styles from './bulk-order.module.css';

export default function BulkOrderPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Bulk Orders</h1>
        <p className={styles.subtitle}>Get special pricing on large orders for your business, events, or gifting needs.</p>

        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <h3>Wholesale Pricing</h3>
            <p>Enjoy significant discounts on orders of 50+ units.</p>
          </div>
          <div className={styles.benefit}>
            <h3>Custom Packaging</h3>
            <p>Add your branding for corporate gifts and events.</p>
          </div>
          <div className={styles.benefit}>
            <h3>Dedicated Support</h3>
            <p>A dedicated account manager for all your needs.</p>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Request a Quote</h2>
          <form className={styles.form}>
            <div className={styles.row}>
              <input type="text" placeholder="Company / Your Name" className={styles.input} />
              <input type="email" placeholder="Email Address" className={styles.input} />
            </div>
            <div className={styles.row}>
              <input type="tel" placeholder="Phone Number" className={styles.input} />
              <input type="number" placeholder="Estimated Quantity" className={styles.input} />
            </div>
            <textarea placeholder="Tell us about your requirements — products, customization, delivery timeline, etc." rows={5} className={styles.textarea}></textarea>
            <button type="submit" className={styles.btn}>Submit Inquiry</button>
          </form>
        </div>

        <p className={styles.note}>You can also reach us directly at <strong>bulk@nazarsoaps.com</strong> or call <strong>+91 98765 43210</strong>.</p>
      </div>
    </PageShell>
  );
}
