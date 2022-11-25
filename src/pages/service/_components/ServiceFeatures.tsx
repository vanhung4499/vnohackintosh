import React from 'react';
import clsx from 'clsx';
import styles from './ServiceFeatures.module.css';

const FeatureList = [
  {
    title: 'CHI PHÍ ĐẶT HỢP LÝ',
    Svg: require('/img/service/money.svg').default,
    description: (
      <>
        Giá cài phù hợp với điều kiện kinh tế ở Việt Nam, đi kèm với chất lượng dịch vụ tốt. Giá cả minh bạch sẽ được báo trước khi cài, cài nhiều máy một lúc sẽ được giảm giá!
      </>
    ),
  },
  {
    title: 'KIẾN THỨC VÀ KINH NGHIỆM',
    Svg: require('/img/service/star.svg').default,
    description: (
      <>
        Tiếp xúc từ 2014, cài dịch vụ từ 2019, chúng tôi tự tin với kiến thức và kinh nghiệm về hackintosh với hơn 2000 lần cần đặt thành công!
      </>
    ),
  },
  {
    title: 'HỖ TRỢ SAU CÀI ĐẶT',
    Svg: require('/img/service/support.svg').default,
    description: (
      <>
        Hỗ trợ bảo hành 30 ngày kể từ ngày cài. Sau đó chúng tôi vẫn sẽ hỗ trợ các vấn đề kĩ thuật với chi phí bằng cốc cafe!
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center margin-bottom--md">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function ServiceFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row margin-bottom--lg">
          <div className="col text--center">
            <h1>Tạo sao chọn chúng tôi?</h1>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
