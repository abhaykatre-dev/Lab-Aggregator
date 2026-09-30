import { FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ResultCard from "../../components/ResultCard/ResultCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import styles from "./Home.module.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [lastQuery, setLastQuery] = useState(null);

  const handleSearch = async (search_query, pincode) => {
    setStatus("loading");
    setResults([]);
    setLastQuery({ search_query, pincode });
    try {
      const res = await fetch(
        `${API_BASE}/api/search?search_query=${encodeURIComponent(search_query)}&pincode=${encodeURIComponent(pincode)}`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResults(data.results);
      setStatus(data.results.length === 0 ? "noResults" : "success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.searchSection}>
        <SearchBar onSearch={handleSearch} isLoading={status === "loading"} />
      </div>

      {status === "loading" && (
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => <div key={i} className={styles.skeleton} />)}
        </div>
      )}

      {status === "success" && (
        <>
          <div className={styles.resultsHeader}>
            <span className={styles.count}>
              <strong>{results.length}</strong> result{results.length !== 1 ? "s" : ""} for{" "}
              <strong>"{lastQuery.search_query}"</strong> in {lastQuery.pincode}
            </span>
            <span className={styles.sortLabel}>
              <FiArrowDown size={11} /> Lowest price first
            </span>
          </div>
          <div className={styles.grid}>
            {results.map((item, i) => (
              <ResultCard key={item.id} item={item} rank={i} />
            ))}
          </div>
        </>
      )}

      {(status === "idle" || status === "noResults" || status === "error") && (
        <EmptyState type={status} />
      )}
    </div>
  );
};

export default Home;
