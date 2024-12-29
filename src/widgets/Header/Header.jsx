import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";


import ThemeButton from "../../shared/UI/Button/ThemeButton/ThemeButton";
import LoginButton from "../../shared/UI/Button/LoginButton/LoginButton";
import Search from "../../entities/Search/Search";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <button className={styles.menu__btn} onClick={toggleMenu}>
          <CiMenuBurger />
        </button>
        <Link to="/" className={styles.logo}>
          A<span>World</span>
        </Link>
        <nav className={`${styles.header_menu} ${isMenuOpen ? styles.menu_open : ""}`}>
          <Link to="/" className={styles.link} onClick={toggleMenu}>
            Главная
          </Link>
          <Link to="/catalog" className={styles.link} onClick={toggleMenu}>
            Каталог
          </Link>
          <Link to="/genres" className={styles.link} onClick={toggleMenu}>
            Жанры
          </Link>
          <Link to="/schedule" className={styles.link} onClick={toggleMenu}>
            Расписание
          </Link>
        </nav>
        <div className={styles.header_controls}>
          <Search />
          <ThemeButton/>
          <LoginButton/>
         
        </div>
      </div>
    </div>
  );
};

export default Header;
