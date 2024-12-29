import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.notif}>
          Copyrights and trademarks for the anime belong to their respective
          owners. Materials are used under the fair use clause.
        </div>
        <div className={styles.copyright}>2024 © AnimeWorld</div>
      </div>
    </footer>
  );
};

export default Footer;
