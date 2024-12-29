import {React} from "react";
import { Link, useNavigate } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

import { IMG_HOST } from "../../../api/apiAnime";
import styles from "./AnimeCard.module.scss";


const AnimeCard = ({ anime, loading }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!loading) {
      navigate(`/title/${anime.alias}`);
    }
  };

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.card}>
        {loading ? (
          <>
            <Skeleton 
            height={330} 
            width={220} 
            baseColor="#333" 
            highlightColor="#555" />
            <Skeleton 
            width={150} 
            height={20} 
            style={{ marginTop: 15 }} 
            baseColor="#333" 
            highlightColor="#555"/>
          </>
        ) : (
          <>
            <Link to={`/title/${anime.alias}`}>
              <img src={IMG_HOST + anime.poster?.optimized?.src} alt="постер" />
            </Link>
            <div className={styles.card_title}>{anime.name?.main}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;
