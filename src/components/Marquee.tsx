import styles from './Marquee.module.css';

interface MarqueeProps {
  text: string;
  variant?: 'orange' | 'default';
}

export default function Marquee({ text, variant = 'default' }: MarqueeProps) {
  const items = Array(8).fill(text);

  return (
    <div className={`${styles.marquee} ${variant === 'orange' ? styles.orange : styles.default}`}>
      <div className={styles.track}>
        {items.map((t, i) => (
          <span key={i} className={styles.item}>
            {t}
            <span className={styles.separator}>&bull;</span>
          </span>
        ))}
        {items.map((t, i) => (
          <span key={`dup-${i}`} className={styles.item}>
            {t}
            <span className={styles.separator}>&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
