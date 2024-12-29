import  {React, useState } from "react";

import styles from "./Filter.module.scss";

const Filter = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    genres: [],
    type: "",
    releaseStatus: "",
    voiceStatus: "",
    seasons: [],
    ageRating: "",
    fromYear: 1996,
    toYear: 2025,
  });

  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const updatedValues = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updatedValues };
    });
  };

  const resetFilters = () => {
    setFilters({
      genres: [],
      type: "",
      releaseStatus: "",
      voiceStatus: "",
      seasons: [],
      ageRating: "",
      fromYear: 1996,
      toYear: 2025,
    });
    setCurrentPage(1); 
  };

  const submitFilters = () => {
    applyFilters(filters);
  };

  return (
    <div className={styles.filter}>
  
      <div className={styles.filterGroup}>
        <label>Тип</label>
        {["TV", "ONA", "WEB", "OVA", "OAD", "MOVIE", "DORAMA", "SPECIAL"].map(
          (type) => (
            <button
              key={type}
              onClick={() => handleInputChange("type", type)}
              className={filters.type === type ? styles.active : ""}
            >
              {type}
            </button>
          )
        )}
      </div>


      <div className={styles.filterGroup}>
        <label>Статус проекта</label>
        {["IS_ONGOING", "IS_NOT_ONGOING"].map((status) => (
          <button
            key={status}
            onClick={() => handleInputChange("releaseStatus", status)}
            className={filters.releaseStatus === status ? styles.active : ""}
          >
            {status === "IS_ONGOING" ? "Выходит" : "Завершён"}
          </button>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <label>Статус перевода</label>
        {["IS_IN_PRODUCTION", "IS_NOT_IN_PRODUCTION"].map((status) => (
          <button
            key={status}
            onClick={() => handleInputChange("voiceStatus", status)}
            className={filters.voiceStatus === status ? styles.active : ""}
          >
            {status === "IS_IN_PRODUCTION" ? "В процессе" : "Завершён"}
          </button>
        ))}
      </div>


      <div className={styles.filterGroup}>
        <label>Сезоны</label>
        {["зима", "весна", "лето", "осень"].map((season) => (
          <button
            key={season}
            onClick={() => handleCheckboxChange("seasons", season)}
            className={filters.seasons.includes(season) ? styles.active : ""}
          >
            {season.charAt(0).toUpperCase() + season.slice(1)}
          </button>
        ))}
      </div>


      <div className={styles.filterGroup}>
        <label>Период выхода</label>
        <div className={styles.slider}>
          <input
            type="range"
            min="1996"
            max="2025"
            value={filters.fromYear}
            onChange={(e) => handleInputChange("fromYear", e.target.value)}
          />
          <input
            type="range"
            min="1996"
            max="2025"
            value={filters.toYear}
            onChange={(e) => handleInputChange("toYear", e.target.value)}
          />
          <div>
            {filters.fromYear} - {filters.toYear}
          </div>
        </div>
      </div>


      <div className={styles.filterGroup}>
        <label>Возрастной рейтинг</label>
        {["R0_PLUS", "R6_PLUS", "R12_PLUS", "R16_PLUS", "R18_PLUS"].map(
          (rating) => (
            <button
              key={rating}
              onClick={() => handleInputChange("ageRating", rating)}
              className={filters.ageRating === rating ? styles.active : ""}
            >
              {rating.replace("_PLUS", "+")}
            </button>
          )
        )}
      </div>

      <div className={styles.buttons}>
        <button onClick={submitFilters} className={styles.apply}>
          Применить
        </button>
        <button onClick={resetFilters} className={styles.reset}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default Filter;
