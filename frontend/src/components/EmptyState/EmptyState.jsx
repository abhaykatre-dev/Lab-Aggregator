import { FiSearch, FiAlertCircle, FiInfo } from "react-icons/fi";
import styles from "./EmptyState.module.css";

const STATES = {
  idle: { Icon: FiSearch, title: "Search for a lab test", sub: "Enter a test name and pincode above." },
  noResults: { Icon: FiAlertCircle, title: "No results found", sub: "Try a different test name or nearby pincode." },
  error: { Icon: FiInfo, title: "Something went wrong", sub: "Make sure the backend server is running on port 5000." },
};

const EmptyState = ({ type }) => {
  const { Icon, title, sub } = STATES[type] || STATES.idle;
  return (
    <div className={styles.empty}>
      <Icon className={styles.icon} size={28} />
      <div className={styles.title}>{title}</div>
      <div className={styles.sub}>{sub}</div>
    </div>
  );
};

export default EmptyState;
