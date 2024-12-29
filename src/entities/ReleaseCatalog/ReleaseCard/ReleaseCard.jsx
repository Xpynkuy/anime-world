import {React} from "react";
import { useNavigate } from "react-router-dom";

import { IMG_HOST } from "../../../api/apiAnime";

import SkeletonCardComponent  from "../../../shared/UI/Skeleton/SkeletonCardComponent ";
import styles from "./ReleaseCard.module.scss";

const ReleaseCard = ({ anime, loading }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!loading) navigate(`/title/${anime.alias}`);
  };

  return loading ? (
    <SkeletonCardComponent  />
  ) : (
    <div className={styles.card__container} onClick={handleCardClick}>
      <div className={styles.left__catalog}>
        <img
          src={IMG_HOST + anime.poster.optimized.src}
          alt={anime.name.main}
          className={styles.poster}
        />
      </div>
      <div className={styles.right__catalog}>
        <div className={styles.title}>
          <h3>{anime.name.main}</h3>
          <p>{anime.name.english}</p>
        </div>
        <div className={styles.info}>
          <p>{anime.year}</p>
          <p>{anime.season.description}</p>
          <p>{anime.age_rating.rating}</p>
        </div>
        <div className={styles.desc}>{anime.description}</div>
      </div>
    </div>
  );
};

export default ReleaseCard;
