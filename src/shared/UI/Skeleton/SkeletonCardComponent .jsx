import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Skeleton.module.scss";

const SkeletonCardComponent  = () => {
  return (
    <div className={styles.card}>
      <Skeleton 
      height={330} 
      width="100%" 
      borderRadius={12}
      baseColor="#333" />
      
    </div>
  );
};

export default SkeletonCardComponent ;
