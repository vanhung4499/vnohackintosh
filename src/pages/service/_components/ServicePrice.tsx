import React from 'react';
import clsx from 'clsx';
import styles from './ServicePrice.module.css';

const PriceList = [
  {
    title: 'BUILD EFI',
    price: '250k',
    description: 'Chỉ làm EFI',
  },
  {
    title: 'TẠI NHÀ',
    price: '350k',
    description: 'Mang máy tới',

  },
  {
    title: 'ONLINE',
    price: '450k',
    description: 'Cài đặt Online',

  },
  {
    title: 'TẬN NƠI',
    price: '550k',
    description: 'Tới tận nhà',

  },
];

function PriceCard({title, price, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className={clsx("card shadow--md", styles.priceCard)}>
        <div className="card__header text--center">
          <h2>{title}</h2>
        </div>
        <div className="card__body text--center margin-vert--lg">
          <p className={styles.textPrice}>{price}</p>
          <p className='text--bold'>{description}</p>
        </div>
        <div className="card__footer">
          <a className="button button--lg button--primary button--block">Đặt lịch ngay!</a>
        </div>
      </div>
    </div>
  );
}

export default function ServicePrice() {
  return (
    <section className={clsx(styles.servicePrice, 'margin-vert--lg')}>
      <div className="container">
        <div className="row">
          <div className="col text--center margin-bottom--lg">
            <h1>Chúng tôi cung cấp các dịch vụ</h1>
          </div>
        </div>
        <div className="row">
          {PriceList.map((props, idx) => (
            <PriceCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
