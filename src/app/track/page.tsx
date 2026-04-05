import PageShell from '@/components/PageShell';
import styles from './track.module.css';

export default function TrackPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Track Your Shipment</h1>
        <p className={styles.subtitle}>Enter your order ID or tracking number to check the status of your delivery.</p>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Order ID or Tracking Number"
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>Track Order</button>
        </form>
        <div className={styles.info}>
          <h3>Need Help?</h3>
          <p>If you have any issues with your order, reach out to us at <strong>support@nazarsoaps.com</strong> or call <strong>+91 98765 43210</strong>.</p>
        </div>
      </div>
    </PageShell>
  );
}
