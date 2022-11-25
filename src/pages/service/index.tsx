import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './service.module.css';
import ServiceFeatures from './_components/ServiceFeatures';
import ServiceHeader from './_components/ServiceHeader';
import ServicePrice from './_components/ServicePrice';
import ServiceRequest from './_components/ServiceRequest';


export default function Service() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
      <ServiceHeader />
      <ServicePrice />
      <ServiceFeatures />
      <ServiceRequest />
    </Layout>
  );
}
