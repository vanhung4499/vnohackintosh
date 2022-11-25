import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Hướng dẫn dễ hiểu',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Hướng dẫn này viết lại bằng tiếng Việt và được tổng hợp từ nhiều nguồn uy tín về hackintosh. Chúng tôi tập trung vào sự dễ hiểu để bạn có thể tự hackintosh!
      </>
    ),
  },
  {
    title: 'Cộng đồng hỗ trợ',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Chúng tôi đã có sẵn một nhóm về hackintosh, bạn có thể trao đổi và học hỏi về các vấn đề gặp phải trong quá trình hackintosh, vui lòng tham khảo <code><a href='/links'>Links</a></code>
      </>
    ),
  },
  {
    title: 'Dịch vụ hackintosh',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Chúng tôi cung cấp dịch vụ hackintosh cho những người không có thời gian tìm hiểu, vui lòng tham khảo <code><a href='/service'>Dịch vụ</a></code>.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
