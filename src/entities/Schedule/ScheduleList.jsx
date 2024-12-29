import {React} from "react";
import ScheduleCard from "./ScheduleCard/ScheduleCard";

const ScheduleList = ({ schedule }) => {
  return (
    <div>
      {schedule.map((item, index) => (
        <ScheduleCard
          key={index}
          schedule={item} 
        />
      ))}
    </div>
  );
};

export default ScheduleList;
