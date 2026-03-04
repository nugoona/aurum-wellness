import { UserCheck, Activity, Award, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './Features.module.css';

const ICONS: Record<string, React.ReactNode> = {
  'user-check': <UserCheck size={48} />,
  activity: <Activity size={48} />,
  award: <Award size={48} />,
  zap: <Zap size={48} />,
};

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export default function Features({ items }: { items: Feature[] }) {
  return (
    <section className="section section--white">
      <div className="container">
        <div className={styles.grid}>
          {items.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={styles.card}>
                <div className={styles.icon}>{ICONS[f.icon]}</div>
                <h3 className={styles.title}>{f.title}</h3>
                <p className={styles.desc}>{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
