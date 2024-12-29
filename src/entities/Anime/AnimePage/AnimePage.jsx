import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactPlayer from "react-player"; 

import { $api, IMG_HOST } from "../../../api/apiAnime";

import { FaRegStar } from "react-icons/fa";
import styles from '../AnimePage/AnimePage.module.scss'

const AnimePage = () => {
  const { alias } = useParams();
  const [anime, setAnime] = useState(null);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    $api
      .get(`/anime/releases/${alias}`)
      .then((response) => {
        setAnime(response.data);
        if (response.data.episodes && response.data.episodes.length > 0) {
          setActiveEpisode(response.data.episodes[0].id);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setError(error);
        setLoading(false);
      });
  }, [alias]);

  useEffect(() => {
    if (anime) {
      const selectedEpisode = anime.episodes.find(
        (episode) => episode.id === activeEpisode
      );
      if (selectedEpisode) {
        const availableQuality = getAvailableQuality(selectedEpisode);
        setSelectedQuality(availableQuality);
      }
    }
  }, [anime, activeEpisode]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Ошибка при загрузке данных</p>;
  }

  const selectedEpisode = anime.episodes.find(
    (episode) => episode.id === activeEpisode
  );

  const getAvailableQuality = (episode) => {
    const qualityOptions = ["hls_1080", "hls_720", "hls_480", "hls_360"];
    for (let quality of qualityOptions) {
      if (episode[quality]) {
        return quality;
      }
    }
    return null; 
  };

  const isContentAvailable = selectedEpisode && selectedQuality;

  return (
    <div className={styles.container}>
      <div className={styles.anime}>
        <div className={styles.anime_left}>
          <div className={styles.poster}>
            <img src={IMG_HOST + anime.poster.optimized.src} alt="poster" />
            <div className={styles.follow}>
              <button className="btn">Добавить в избранное</button>
            </div>
          </div>
          <div className={styles.info__table}>
            <div className={styles.info__title}>Тип</div>
            <div className={styles.info__value}>{anime.type.description}</div>
            <div className={styles.info__title}>Сезон</div>
            <div className={styles.info__value}>{anime.season.description}</div>
            <div className={styles.info__title}>День выхода</div>
            <div className={styles.info__value}>
              {anime.publish_day.description}
            </div>
            <div className={styles.info__title}>Всего эпизодов</div>
            <div className={styles.info__value}>{anime.episodes_total}</div>
            <div className={styles.info__title}>Возрастной рейтинг</div>
            <div className={styles.info__value}>{anime.age_rating.label}</div>
          </div>
        </div>
        <div className={styles.anime_right}>
          <div className={styles.header}>
            <div className={styles.year}>{anime.year}</div>
            <div className={styles.favor}>
              <FaRegStar />
              {anime.added_in_users_favorites}
            </div>
          </div>
          <div className={styles.title}>
            <h1>{anime.name.main}</h1>
            <p>{anime.name.english}</p>
            <hr style={{ borderColor: "gray", marginBottom: "25px" }} />
          </div>
          <div className={styles.desc}>
            <h3>Описание</h3>
            {anime.description}
          </div>
          <div className={styles.media}>
            <div className={styles.player}>
              {isContentAvailable ? (
                <ReactPlayer
                  url={selectedEpisode[selectedQuality]}
                  controls
                  width="100%"
                  height="100%"
                />
              ) : (
                <div className={styles.noContent}>
                  <p>Контент для данного эпизода отсутствует или заблокирован.</p>
                </div>
              )}
            </div>

            {isContentAvailable && (
              <div className={styles.episode_list}>
                {anime.episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className={styles.episode_item}
                    onClick={() => setActiveEpisode(episode.id)}
                  >
                    Серия {episode.ordinal} {episode.name_english}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
