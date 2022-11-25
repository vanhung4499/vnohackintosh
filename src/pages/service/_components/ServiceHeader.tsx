import React from "react";
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ServiceHeader.module.css';


export default function ServiceHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroIntro}>
        <h1 className={styles.heroTitle}>Dịch vụ Hackintosh</h1>
        <p className={styles.heroSubtitle}>Cài đặt macOS lên PC/Laptop của bạn một cách nhanh chóng!</p>
      </div>
    </header>
  );
}