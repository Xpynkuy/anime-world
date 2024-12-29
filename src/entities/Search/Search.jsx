import React, { useState, useEffect, useRef } from "react";
import { $api, IMG_HOST } from "../../api/apiAnime";
import styles from "./Search.module.scss";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchContainerRef = useRef(null); // Ссылка на контейнер поиска
  const navigate = useNavigate();

  // Обработчик поиска
  const handleSearch = async (e) => {
    const searchText = e.target.value;
    setQuery(searchText);

    if (!searchText.trim()) {
      setResults([]); // Очистка результатов, если поле пустое
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await $api.get("/app/search/releases", {
        params: { query: searchText },
      });
      setResults(response.data || []);
    } catch (err) {
      console.error("Ошибка при поиске:", err);
      setError("Не удалось выполнить поиск.");
    } finally {
      setLoading(false);
    }
  };

  // Обработчик клика по карточке
  const handleCardClick = (alias) => {
    setQuery(""); // Сброс инпута
    setResults([]); // Очистка результатов
    navigate(`/title/${alias}`);
  };

  // Обработчик клика вне поиска
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setQuery(""); // Сброс инпута
        setResults([]); // Очистка результатов
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchContainer} ref={searchContainerRef}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Что ищем?"
        className={styles.searchInput}
      />

      {/* Результаты поиска */}
      {query.trim() && (
        <div className={styles.resultsContainer}>
          {loading && <p>Загрузка...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {results.length > 0 ? (
            results.map((anime) => (
              <div
                key={anime.id}
                className={styles.resultCard}
                onClick={() => handleCardClick(anime.alias)}
              >
                <img
                  src={IMG_HOST + anime.poster.optimized.src}
                  alt={anime.name.main}
                  className={styles.thumbnail}
                />
                <div className={styles.details}>
                  <h4>{anime.name.main}</h4>
                  <p>{anime.type.description}</p>
                  <p>{anime.year}</p>
                </div>
              </div>
            ))
          ) : (
            !loading && <p>Нет результатов для "{query}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
