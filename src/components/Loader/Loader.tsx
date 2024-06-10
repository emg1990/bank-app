import React from 'react';
import { Spin } from 'antd';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <Spin size="large" className={styles.loader}/>
  );
};

export default Loader;