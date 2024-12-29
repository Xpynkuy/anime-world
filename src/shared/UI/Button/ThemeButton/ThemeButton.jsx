import React, { useContext } from "react";


import styles from "../ThemeButton/ThemeButton.module.scss";
import { CiSun } from "react-icons/ci";
import { ThemeContext } from "../../../../app/providers/ThemeProvider";

const ThemeButton = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button className={styles.btn} onClick={changeTheme}>
      <CiSun className={styles.btn_icon} />
    </button>
  );
};

export default ThemeButton;
