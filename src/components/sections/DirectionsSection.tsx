import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './DirectionsSection.module.css';

export default function DirectionsSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.wrap}`}>
        {/* Left: Info */}
        <ScrollReveal>
          <div className={styles.info}>
            <span className={styles.label}>DIRECTIONS</span>
            <h2 className={styles.title}>오시는 길</h2>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>주소</h3>
              <p className={styles.text}>
                인천 부평구 부평문화로 56, 3층
                <br />
                <span className={styles.muted}>아우르메 테라피</span>
              </p>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>대중교통</h3>
              <ul className={styles.list}>
                <li>
                  <strong>1호선 부평역 6번 출구</strong>
                  <span className={styles.muted}> · 지상 도로 직진 약 7분</span>
                </li>
                <li>
                  <strong>부평역 지하상가 29번 출구</strong>
                  <span className={styles.muted}> · 나오자마자 좌회전, 1층 과일가게(부평 마그네) 건물 3층</span>
                </li>
              </ul>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>주차 안내</h3>
              <p className={styles.text}>
                차량 방문시 도착 전 반드시 문의
                <br />
                <a href="tel:032-227-0486" className={styles.phone}>032-227-0486</a>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Map */}
        <ScrollReveal delay={0.15}>
          <div className={styles.map}>
            <iframe
              src="https://maps.google.com/maps?q=%EC%9D%B8%EC%B2%9C+%EB%B6%80%ED%8F%89%EA%B5%AC+%EB%B6%80%ED%8F%89%EB%AC%B8%ED%99%94%EB%A1%9C+56&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="아우르메 테라피 위치"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
