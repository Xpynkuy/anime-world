import { React, useEffect, useState } from "react";

import { $api } from "../../../api/apiAnime";

import ScheduleCard from "../ScheduleCard/ScheduleCard";
import styles from "../ScheduleNow/scheduleNow.module.scss";

const ScheduleNow = () => {
  const [scheduleData, setScheduleData] = useState({
    today: [],
    tomorrow: [],
    yesterday: [],
  });
  const [selectedDay, setSelectedDay] = useState("today"); 

  useEffect(() => {
    $api
      .get("/anime/schedule/now")
      .then((response) => {
        setScheduleData({
          today: response.data.today || [],
          tomorrow: response.data.tomorrow || [],
          yesterday: response.data.yesterday || [],
        });
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setScheduleData({ today: [], tomorrow: [], yesterday: [] });
      });
  }, []);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className={styles.container}>
      <h2>Расписание</h2>
      <div className={styles.buttons}>
        <button
          onClick={() => handleDayChange("yesterday")}
          className={selectedDay === "yesterday" ? styles.active : ""}
        >
          Вчера
        </button>
        <button
          onClick={() => handleDayChange("today")}
          className={selectedDay === "today" ? styles.active : ""}
        >
          Сегодня
        </button>
        <button
          onClick={() => handleDayChange("tomorrow")}
          className={selectedDay === "tomorrow" ? styles.active : ""}
        >
          Завтра
        </button>
      </div>
      <div className={styles.schedule__section}>
        {scheduleData[selectedDay].length > 0 ? (
          scheduleData[selectedDay].map((item) => (
            <ScheduleCard key={item.release.id} schedule={item} />
          ))
        ) : (
          <p>Нет данных для выбранного дня</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleNow;
