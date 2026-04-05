import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.grid}>
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Shipping Information</h2>
              <form className={styles.form}>
                <div className={styles.formRow}>
                  <input type="text" placeholder="First Name" className={styles.input} />
                  <input type="text" placeholder="Last Name" className={styles.input} />
                </div>
                <input type="text" placeholder="Address" className={styles.input} />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className={styles.input} />
                <div className={styles.formRow}>
                  <input type="text" placeholder="City" className={styles.input} />
                  <input type="text" placeholder="State/Province" className={styles.input} />
                  <input type="text" placeholder="PIN Code" className={styles.input} />
                </div>
                <input type="tel" placeholder="Phone" className={styles.input} />
                
                <h2 className={styles.sectionTitle}>Payment</h2>
                <div className={styles.paymentMethods}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="payment" defaultChecked /> Credit / Debit Card / UPI
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="payment" /> Cash on Delivery
                  </label>
                </div>
                
                <button type="button" className={styles.submitBtn}>Place Order</button>
              </form>
            </div>
            <div className={styles.summarySection}>
              <h2 className={styles.sectionTitle}>Order Summary</h2>
              <div className={styles.summaryBox}>
                <div className={styles.summaryItem}>
                  <span>Subtotal</span>
                  <span>Rs. 1,548.00</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>Rs. 1,548.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
