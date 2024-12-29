import React from "react";
import styles from "../Select/CatalogSelect.module.scss";

const CatalogSelect = ({ options, value, onChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default CatalogSelect;
