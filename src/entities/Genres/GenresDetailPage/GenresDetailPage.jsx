import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { $api } from "../../../api/apiAnime";

import AnimeCard from "../../Anime/AnimeCard/AnimeCard";
import styles from "./GenresDetailPage.module.scss";

const GenresDetailPage = () => {
  const { alias } = useParams(); 
  const [genreName, setGenreName] = useState(""); 
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGenreDetails(); 
    fetchGenreReleases(); 
  }, [alias]);


  const fetchGenreDetails = async () => {
    try {
      const response = await $api.get(`/anime/genres/${alias}`);
      setGenreName(response.data.name || "Жанр"); 
    } catch (err) {
      console.error("Ошибка загрузки данных жанра:", err);
      setGenreName("Жанр"); 
    }
  };


  const fetchGenreReleases = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await $api.get(`/anime/genres/${alias}/releases`);
      setReleases(response.data.data || []);
    } catch (err) {
      console.error("Ошибка загрузки релизов жанра:", err);
      setError("Ошибка при загрузке данных.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Аниме в жанре {genreName}</h1>
      {error && <p>{error}</p>}
      <div className={styles.genres}>
        {loading ? (
          Array.from({ length: releases.length || 10 }).map((_, index) => (
            <AnimeCard key={index} loading={true} />
          ))
        ) : releases.length > 0 ? (
          releases.map((release) => (
            <AnimeCard key={release.id} anime={release} />
          ))
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>
    </div>
  );
};

export default GenresDetailPage;
