import PageShell from '@/components/PageShell';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <PageShell>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>We would love to hear from you. Fill out the form below or reach us directly.</p>

        <div className={styles.grid}>
          <form className={styles.form}>
            <div className={styles.row}>
              <input type="text" placeholder="Your Name" className={styles.input} />
              <input type="email" placeholder="Your Email" className={styles.input} />
            </div>
            <input type="text" placeholder="Subject" className={styles.input} />
            <textarea placeholder="Your Message" rows={6} className={styles.textarea}></textarea>
            <button type="submit" className={styles.btn}>Send Message</button>
          </form>

          <div className={styles.details}>
            <div className={styles.detailBlock}>
              <h3>Email</h3>
              <p>support@nazarsoaps.com</p>
            </div>
            <div className={styles.detailBlock}>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>
            <div className={styles.detailBlock}>
              <h3>Address</h3>
              <p>Nazar Soaps Pvt. Ltd.<br />123, Ayurveda Lane, Mumbai,<br />Maharashtra 400001, India</p>
            </div>
            <div className={styles.detailBlock}>
              <h3>Business Hours</h3>
              <p>Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
