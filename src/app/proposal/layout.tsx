import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아우름웰니스 서비스 제안서',
  description: '아우름웰니스 B2B 종합복지서비스 제안서 - 기업 임직원 복지, VIP 브랜드 이벤트, 맞춤 테라피',
};

export default function ProposalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter+Tight:wght@300;400;500;600;700&family=Nanum+Pen+Script&family=Gaegu&family=Hi+Melody&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
