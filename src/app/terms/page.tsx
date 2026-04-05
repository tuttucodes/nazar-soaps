import PageShell from '@/components/PageShell';
import styles from './terms.module.css';

export default function TermsPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Terms & Conditions</h1>
        <p className={styles.updated}>Last updated: April 2026</p>

        <div className={styles.section}>
          <h2>1. General</h2>
          <p>By accessing and using the Nazar Soaps website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.</p>
        </div>

        <div className={styles.section}>
          <h2>2. Products & Pricing</h2>
          <p>All product descriptions, images, and prices are provided for informational purposes and may be subject to change without notice. We make every effort to display accurate colors and details, but slight variations may occur due to screen settings. Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</p>
        </div>

        <div className={styles.section}>
          <h2>3. Orders & Payment</h2>
          <p>By placing an order, you confirm that all information provided is accurate. We reserve the right to refuse or cancel any order at our discretion. Payment must be completed at the time of purchase for prepaid orders. Cash on Delivery (COD) is available for select locations.</p>
        </div>

        <div className={styles.section}>
          <h2>4. Shipping & Delivery</h2>
          <p>We aim to deliver all orders within 3-7 business days. Delivery timelines may vary based on your location and external factors beyond our control. Free shipping is available on all prepaid orders. Additional shipping charges may apply for COD orders.</p>
        </div>

        <div className={styles.section}>
          <h2>5. Returns & Refunds</h2>
          <p>Please refer to our Returns & Refunds page for detailed information about our return policy, refund process, and eligibility criteria.</p>
        </div>

        <div className={styles.section}>
          <h2>6. Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and designs, is the property of Nazar Soaps Pvt. Ltd. and is protected by copyright and trademark laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.</p>
        </div>

        <div className={styles.section}>
          <h2>7. Limitation of Liability</h2>
          <p>Nazar Soaps shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product in question.</p>
        </div>

        <div className={styles.section}>
          <h2>8. Governing Law</h2>
          <p>These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.</p>
        </div>

        <div className={styles.section}>
          <h2>9. Contact</h2>
          <p>For questions about these Terms & Conditions, contact us at <strong>legal@nazarsoaps.com</strong>.</p>
        </div>
      </div>
    </PageShell>
  );
}
