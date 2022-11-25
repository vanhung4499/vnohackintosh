import React from "react";
import clsx from "clsx";
import styles from "./ServiceRequest.module.css";

export default function ServiceRequest() {
  return (
    <section id="request" className={clsx(styles.serviceRequest)}>
      <div className="container">
        <div className="row">
          <div className="col text--center margin-bottom--lg">
            <h1>Liên hệ với chúng tôi</h1>
            <h3>Để được báo giá chi tiết</h3>
          </div>
        </div>
        <div className="row">
          <div className="col col--6 text--center">
            <h2>VNOHackintosh</h2>
            <div>
              Chúng tôi làm việc hằng ngày
            </div>
            <div>Vui lòng gửi report aida64 để trao đổi chi tiết</div>
            <div><a href="/docs/basic-knowledge/find-hardware">Cách tạo report aida64</a></div>
            <a
              href="tel:+84377930334"
              className="button button--success button--lg margin-vert--md"
            >
              Gọi 0377930334 - Hùng
            </a>
            <div>Thông tin liên lạc ở ngay dưới ⇩ <span className="badge badge--info">Contact</span>

</div>
          </div>
          <div className="col col--6">
            <div className="avatar avatar--vertical">
              <h2>Về tôi</h2>
              <img
                className="avatar__photo avatar__photo--xl"
                src="https://avatars.githubusercontent.com/u/13531947?s=96&v=4"
              />
              <div className="avatar__intro margin-top--md">
                <div className="avatar__name">Nguyễn Văn Hùng</div>
                <p className="avatar__subtitle">
                  Fullstack Web Developer, Hackintosher
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
