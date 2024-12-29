import React from 'react'
import { RiLoader2Line } from "react-icons/ri";

import styles from '../Loader/Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <RiLoader2Line />
    </div>
  )
}

export default Loader
