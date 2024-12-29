import { React, useEffect, useState } from "react";

import { $api } from "../../api/apiAnime";

import GenresCard from "./GenresCard/GenresCard";
import styles from "../Genres/Genres.module.scss";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    setLoading(true);
    $api
      .get("/anime/genres")
      .then((response) => {
        const data = response.data || [];
        setGenres(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setGenres([]);
        setError("Ошибка при загрузке данных");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Список всех жанров</h1>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.item}>
        {loading ? (
         
          Array.from({ length: 35 }).map((_, index) => (
            <GenresCard key={index} loading={true} />
          ))
        ) : genres.length > 0 ? (
        
          genres.map((item) => <GenresCard key={item.id} genres={item} />)
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>
    </div>
  );
};

export default Genres;
