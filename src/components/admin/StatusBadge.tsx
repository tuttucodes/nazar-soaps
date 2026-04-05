import styles from "./StatusBadge.module.css";

const STATUS_COLORS: Record<string, string> = {
  active: "green",
  delivered: "green",
  paid: "green",
  completed: "green",
  shipped: "blue",
  confirmed: "blue",
  pending: "yellow",
  draft: "gray",
  paused: "gray",
  archived: "gray",
  cancelled: "red",
  returned: "red",
  failed: "red",
  refunded: "orange",
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLORS[status] || "gray";
  return (
    <span className={`${styles.badge} ${styles[color]}`}>
      {status}
    </span>
  );
}
