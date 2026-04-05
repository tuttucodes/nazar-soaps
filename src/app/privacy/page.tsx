import PageShell from '@/components/PageShell';
import styles from './privacy.module.css';

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 2026</p>

        <div className={styles.section}>
          <h2>1. Information We Collect</h2>
          <p>When you visit our website or make a purchase, we collect certain information including your name, email address, shipping address, phone number, and payment details. We also collect browsing data such as your IP address, browser type, and pages visited.</p>
        </div>

        <div className={styles.section}>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to process your orders, communicate with you about your purchases, improve our website and products, send promotional offers (with your consent), and comply with legal obligations.</p>
        </div>

        <div className={styles.section}>
          <h2>3. Information Sharing</h2>
          <p>We do not sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, and delivering orders. These partners are bound by confidentiality agreements.</p>
        </div>

        <div className={styles.section}>
          <h2>4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.</p>
        </div>

        <div className={styles.section}>
          <h2>5. Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
        </div>

        <div className={styles.section}>
          <h2>6. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time. You can also opt out of marketing communications by clicking the unsubscribe link in our emails or contacting us directly.</p>
        </div>

        <div className={styles.section}>
          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <strong>privacy@nazarsoaps.com</strong>.</p>
        </div>
      </div>
    </PageShell>
  );
}
