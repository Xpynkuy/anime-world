import {React} from "react";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'; 

import { IMG_HOST } from "../../../api/apiAnime";
import styles from "../GenresCard/GenresCard.module.scss";

const GenresCard = ({ genres, loading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {loading ? (
          <>
            <Skeleton 
              height={192} 
              width="100%" 
              borderRadius={8}
              baseColor="#333" 
              highlightColor="#555" 
            />
          </>
        ) : (
          <>
            <Link to={`/genres/${genres.id}`}>
              <img
                src={IMG_HOST + genres.image?.preview}
                alt={genres.name}
                className={styles.thumbnail}
              />
            </Link>
            <div className={styles.title}>{genres.name}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenresCard;
