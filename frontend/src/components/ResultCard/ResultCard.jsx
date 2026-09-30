import {
  FiHome, FiCheckCircle, FiPackage,
  FiActivity, FiTrendingDown
} from "react-icons/fi";

import styles from "./ResultCard.module.css";

const ResultCard = ({ item, rank }) => {
  const {
    provider_name, item_type, item_name, included_tests,
    pricing, logistics, nabl_accredited, totalFinalPrice,
  } = item;

  const isPackage = item_type === "package";
  const discount = Math.round(((pricing.mrp - pricing.offer_price) / pricing.mrp) * 100);

  return (
    <div className={styles.card}>
      {rank === 0 && (
        <div className={styles.bestBadge}>
          <FiTrendingDown size={10} /> Best Price
        </div>
      )}

      <div className={styles.topRow}>
        <span className={styles.provider}>{provider_name}</span>
        <div className={styles.badges}>
          <span className={styles.badge}>
            {isPackage ? <FiPackage size={10} /> : <FiActivity size={10} />}
            {isPackage ? "Package" : "Single Test"}
          </span>
          {nabl_accredited && (
            <span className={`${styles.badge} ${styles.badgeNabl}`}>
              <FiCheckCircle size={10} /> NABL
            </span>
          )}
        </div>
      </div>

      <div className={styles.itemName}>{item_name}</div>

      {isPackage && (
        <>
          <div className={styles.tagsLabel}>Includes</div>
          <div className={styles.tags}>
            {included_tests.map((t, i) => <span key={i} className={styles.tag}>{t}</span>)}
          </div>
        </>
      )}

      <div className={styles.divider} />

      {/* Price row — always left | right, no stacking */}
      <div className={styles.priceRow}>
        {/* Left: pricing details */}
        <div className={styles.priceLeft}>
          <div className={styles.mrpRow}>
            <span className={styles.mrp}>₹{pricing.mrp.toLocaleString("en-IN")}</span>
            {discount > 0 && <span className={styles.discount}>{discount}% off</span>}
          </div>
          <div className={styles.offerPrice}>₹{pricing.offer_price.toLocaleString("en-IN")}</div>
          <div className={styles.collectionNote}>
            <FiHome size={11} />
            {logistics.home_collection
              ? logistics.home_collection_fee === 0
                ? <span className={styles.collectionFree}>Free home collection</span>
                : `+₹${logistics.home_collection_fee} home collection`
              : "Walk-in only"}
          </div>
        </div>

        {/* Right: total final price — plain text, no box */}
        <div className={styles.totalRight}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalPrice}>₹{totalFinalPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
