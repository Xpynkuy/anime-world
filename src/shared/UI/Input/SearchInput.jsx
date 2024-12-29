import React from "react";
import styles from "../Input/SearchInput.module.scss"

const SearchInput = () => {
  return <input 
  typeof="search"
  className={styles.searchInput} 
  placeholder="Что ищем?"
  />;
};

export default SearchInput;
