import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './BrandStory.module.css';

export default function BrandStory() {
  return (
    <section className="section section--white">
      <div className={`container container--narrow ${styles.wrap}`}>
        <ScrollReveal>
          <div className="deco-line" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className={styles.title}>
            내면의 빛을 깨우는<br />바디 힐링 테라피
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className={styles.body}>
            고객님께 합리적인 비용으로 제공하는 최고의 서비스와 만족을 위해
            늘 최선을 다하고 있으며, 바쁜 현대인들에게는 돈으로는 살 수 없는
            편안한 안식처가 되고자 합니다. 전문적이고 체계적인 교육을 받은
            테라피스트들이 귀하의 지친 몸과 마음을 따뜻하게 치유해 드릴 것입니다.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
