import { useState } from "react";
import { FiSearch, FiMapPin, FiActivity } from "react-icons/fi";
import styles from "./SearchBar.module.css";

const HINTS = [
  { query: "Lipid Profile", pincode: "110001" },
  { query: "MRI Brain", pincode: "560034" },
  { query: "HbA1c", pincode: "110001" },
  { query: "Lipid Profile", pincode: "110002" },
];

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || !pincode.trim()) return;
    onSearch(query.trim(), pincode.trim());
  };

  const applyHint = (h) => {
    setQuery(h.query);
    setPincode(h.pincode);
    onSearch(h.query, h.pincode);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="test-name">
            <FiActivity className={styles.labelIcon} /> Test Name
          </label>
          <input
            id="test-name"
            className={styles.input}
            placeholder="e.g. Lipid Profile"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="pincode">
            <FiMapPin className={styles.labelIcon} /> Pincode
          </label>
          <input
            id="pincode"
            className={styles.input}
            placeholder="e.g. 110001"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className={styles.btn} disabled={isLoading}>
          <FiSearch size={14} />
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className={styles.hints}>
        <span className={styles.hintsLabel}>Try:</span>
        {HINTS.map((h, i) => (
          <button key={i} type="button" className={styles.chip} onClick={() => applyHint(h)}>
            {h.query} · {h.pincode}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
