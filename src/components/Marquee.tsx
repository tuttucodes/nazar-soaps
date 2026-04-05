import styles from './Marquee.module.css';

interface MarqueeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function Marquee({ text, backgroundColor = 'var(--primary)', textColor = '#000' }: MarqueeProps) {
  // Creating an array of text to ensure the marquee fills the screen and scrolls smoothly
  const items = Array(15).fill(text);

  return (
    <div className={styles.marqueeContainer} style={{ backgroundColor, color: textColor }}>
      <div className={styles.marqueeContent}>
        {items.map((item, index) => (
          <span key={index} className={styles.marqueeItem}>{item}</span>
        ))}
      </div>
      <div className={styles.marqueeContent} aria-hidden="true">
        {items.map((item, index) => (
          <span key={index + items.length} className={styles.marqueeItem}>{item}</span>
        ))}
      </div>
    </div>
  );
}
