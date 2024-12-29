import {React, useEffect, useState } from "react";

import { $api } from "../../api/apiAnime";

import AnimeCard from "../Anime/AnimeCard/AnimeCard";
import styles from "../Release/Release.module.scss";


const Release = () => {
  const [release, setRelease] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $api
      .get("/anime/releases/latest?limit=6")
      .then((response) => {
        setRelease(response.data || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setRelease([]); 
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Аниме онлайн</h2>
      </div>
      <div className={styles.release}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <AnimeCard key={index} loading={true} />
          ))
        ) : (
          release.length > 0 ? (
            release.map((item) => (
              <AnimeCard key={item.id} anime={item} />
            ))
          ) : (
            <p>Нет данных для отображения</p>
          )
        )}
      </div>
    </div>
  );
};

export default Release;
