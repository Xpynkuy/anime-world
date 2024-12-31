import { React } from "react";
import { useNavigate } from "react-router-dom";

import { IMG_HOST } from "../../../api/apiAnime";
import styles from "../ScheduleCard/ScheduleCard.module.scss";

const ScheduleCard = ({ schedule }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/title/${schedule.release.alias}`);
  };


  const freshTime = schedule.release.fresh_at
    ? schedule.release.fresh_at.split("T")[1]?.slice(0, 5)
    : "00:00"; 
  const publishDay = schedule.release.publish_day?.description || "Не указано"; 

  return (
    <div className={styles.container} onClick={() => handleCardClick()}>
      <div className={styles.card}>
        <div className={styles.poster}>
          <img
            src={IMG_HOST + schedule.release.poster.optimized.src}
            alt="poster"
          />
        </div>

        <div className={styles.anime__block}>
          <div className={styles.card__title}>
            {schedule.release.name.main}
          </div>
          <div className={styles.data}>
            {publishDay}, {freshTime}
          </div>
        </div>

        <div className={styles.card__episode}>
          {schedule.new_release_episode_ordinal} СЕРИЯ
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
