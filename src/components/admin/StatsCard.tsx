import styles from "./StatsCard.module.css";

interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function StatsCard({ label, value, change, changeType = "neutral" }: StatsCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {change && (
        <p className={`${styles.change} ${styles[changeType]}`}>{change}</p>
      )}
    </div>
  );
}
