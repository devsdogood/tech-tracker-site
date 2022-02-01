import React from 'react';
import styles from "./Status.module.css"
import { Badge } from '@mantine/core';




const Status = () => {
  return (
      <body className = {styles['main']}>
      <div className={styles['title-text']}>Tech Tracker Site</div>
      <h1 className={styles['devices']}><Badge border-size = {100  } radius ={100} variant="dot" color = "red" size = "xl" className={styles['badges']}>Device 1</Badge></h1>
      <h1 className={styles['devices']}><Badge radius ={100} variant="dot" color = "green" size = "xl" className={styles['badges']}>Device 2</Badge></h1>
      </body>
      
  )
};

export default Status;
