import React from 'react';
import styles from './index.less';
import Home from '@/pages/home';
import Header from '@/layouts/header';

export default function() {
  return <>
    <Header />
    <div className={styles.normal}>
      <Home />
    </div>
  </>;
}
