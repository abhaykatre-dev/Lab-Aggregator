import styles from "./Navbar.module.css";

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.inner}>
      <div className={styles.brand}>
        Lab&nbsp;<span className={styles.brandAccent}>Aggregator</span>
      </div>
      <span className={styles.tagline}>Compare lab prices near you</span>
    </div>
  </nav>
);

export default Navbar;
