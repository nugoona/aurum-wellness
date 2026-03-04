'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './FAQ.module.css';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="section section--white">
      <div className="container container--narrow">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-header__label">FAQ</span>
            <h2 className="section-header__title">자주 묻는 질문</h2>
          </div>
        </ScrollReveal>

        <div className={styles.list}>
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className={`${styles.item} ${openIndex === i ? styles.open : ''}`}>
                <button className={styles.question} onClick={() => toggle(i)}>
                  <span>{item.q}</span>
                  <ChevronDown size={20} className={styles.arrow} />
                </button>
                <div className={styles.answer}>
                  <div className={styles.answerInner}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
