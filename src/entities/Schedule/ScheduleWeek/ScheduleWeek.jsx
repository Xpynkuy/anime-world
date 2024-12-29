import {React, useEffect, useState } from "react";
import { $api } from "../../../api/apiAnime";

import ScheduleCard from "../ScheduleCard/ScheduleCard";
import Loader from "../../../shared/UI/Loader/Loader";
import styles from "../ScheduleWeek/scheduleWeek.module.scss";


const ScheduleWeek = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [selectedDay, setSelectedDay] = useState("понедельник");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    $api
      .get("/anime/schedule/week")
      .then((response) => {
        const dayMap = {
          понедельник: "понедельник",
          вторник: "вторник",
          среда: "среда",
          четверг: "четверг",
          пятница: "пятница",
          суббота: "суббота",
          воскресенье: "воскресенье",
        };

        const parsedData = {
          понедельник: [],
          вторник: [],
          среда: [],
          четверг: [],
          пятница: [],
          суббота: [],
          воскресенье: [],
        };

        response.data.forEach((item) => {
          const day =
            dayMap[item.release.publish_day.description.toLowerCase()] || null;
          if (day && parsedData[day]) {
            parsedData[day].push(item);
          }
        });

        setScheduleData(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setError("Не удалось загрузить расписание");
        setLoading(false);
      });
  }, []);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className={styles.container}>
      <h1>Расписание на всю неделю</h1>
      <div className={styles.buttons}>
        {Object.keys(scheduleData).map((day) => (
          <button
            key={day}
            onClick={() => handleDayChange(day)}
            className={selectedDay === day ? styles.active : ""}
          >
            {day[0].toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className={styles.schedule__section}>
          {scheduleData[selectedDay]?.length > 0 ? (
            scheduleData[selectedDay].map((item) => (
              <ScheduleCard key={item.release.id} schedule={item} />
            ))
          ) : (
            <p>Нет данных для выбранного дня</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleWeek;
