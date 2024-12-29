import { React } from "react";

import Release from "../../entities/Release/Release";
import ScheduleNow from "../../entities/Schedule/ScheduleNow/ScheduleNow";

const HomePage = () => {
  return (
    <>
      <Release />

      <ScheduleNow />
    </>
  );
};

export default HomePage;
