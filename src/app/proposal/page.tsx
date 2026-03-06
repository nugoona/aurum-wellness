import Link from 'next/link';
import './proposal.css';

/* eslint-disable @next/next/no-img-element */

const AurumLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 144.9 35.9" xmlns="http://www.w3.org/2000/svg">
    <g><g><g>
      <path fill="#fff" d="M50.4,18.8c0,2.1.5,4.2,1.9,6.1h-1.3c-1.4-1.6-2-3.7-2-6.2v-.6c0-2.5.7-4.5,2-6.2h1.3c-1.3,1.8-1.9,3.9-1.9,6.1V18.8z"/>
      <path fill="#fff" d="M58.2,24.5v-4.3h-5.1V19h11.6v1.2h-5.1v4.3H58.2z M58.9,15.6L58.9,15.6c-.2.3-.6.7-1.5,1.1-.7.4-1.7.8-2.8,1.3L54,16.9c1-.4,2-.8,2.9-1.3,1.1-.6,1.3-1.2,1.3-1.9h-3.6v-1.2h8.7v1.2h-3.7c0,.7.2,1.3,1.3,1.9.9.5,1.9.9,2.9,1.3L63.3,18c-1.1-.4-2.1-.9-2.8-1.3C59.5,16.3,59.1,15.9,58.9,15.6z"/>
      <path fill="#fff" d="M67.4,18.1c0-2.2-.5-4.3-1.9-6.1h1.3c1.4,1.6,2,3.7,2,6.2v.6c0,2.5-.7,4.6-2,6.2h-1.3c1.4-1.9,1.9-4,1.9-6.1V18.1z"/>
      <path fill="#fff" d="M77,16.4v1.4c0,2.4-1.3,3.7-3.2,3.7-1.9,0-3.2-1.2-3.2-3.7v-1.4c0-2.4,1.3-3.7,3.2-3.7C75.7,12.7,77,13.9,77,16.4z M75.7,17.6v-1c0-1.9-.9-2.6-1.9-2.6-1,0-1.9.7-1.9,2.6v1c0,1.9.9,2.6,1.9,2.6C74.8,20.2,75.7,19.5,75.7,17.6z M82.1,17.6h-2v6.9h-1.4V11.8h1.4v4.6h2V17.6z"/>
      <path fill="#fff" d="M87.9,24.5v-4.2h-5.1v-1.2h11.6v1.2h-5.1v4.2H87.9z M92.8,14.8v.5c0,1.6-1.7,2.7-4.3,2.7-2.6,0-4.3-1.1-4.3-2.7v-.5c0-1.6,1.7-2.7,4.3-2.7C91.2,12.1,92.8,13.2,92.8,14.8z M91.5,15.3v-.4c0-.9-1.2-1.6-2.9-1.6s-2.9.6-2.9,1.6v.4c0,.9,1.2,1.6,2.9,1.6S91.5,16.2,91.5,15.3z"/>
      <path fill="#fff" d="M106.9,18.4v1.1H95.3v-1.1H106.9z M96.9,17.6v-3.2h6.9v-1h-7v-1.1h8.3v3.2h-6.9v1h7.1v1.1H96.9z M105.2,24.5h-8.3v-4h8.3V24.5z M103.9,21.6h-5.6v1.8h5.6V21.6z"/>
      <path fill="#fff" d="M114.4,17.4c-.7.1-1.6.1-2.5.2v1.7h-1.7v-1.7c-.8,0-1.6,0-2.5,0v-1.3c2.8,0,4.7,0,6.6-.2L114.4,17.4z M108.3,14.2v-.4c0-1.2,1.3-1.8,2.8-1.8s2.8.7,2.8,1.8v.4c0,1.2-1.3,1.8-2.8,1.8S108.3,15.3,108.3,14.2z M109.8,13.9v.1c0,.5.6.7,1.3.7.6,0,1.3-.2,1.3-.7v-.1c0-.5-.6-.7-1.3-.7C110.5,13.2,109.8,13.4,109.8,13.9z M118.9,19.7v3.1h-6.9v.6h7.2v1.3h-8.9v-3.1h6.9V21h-6.9v-1.3H118.9z M116.6,19.3H115v-.2h-2v-1.2h2v-5.9h1.6V19.3z M118.9,19.3h-1.6v-7.6h1.6V19.3z"/>
      <path fill="#fff" d="M123,19.7h.9c1.3,0,2.9-.1,4.2-.3l.2,1.5c-1.3.2-3.2.3-4.8.3h-2.3v-8.4h1.8V19.7z M131,24.6h-1.7V11.8h1.7V24.6z"/>
      <path fill="#fff" d="M144.5,21.5V23h-11.7v-1.5H144.5z M138.7,16.8c-.1.3-.6.7-1.3,1.1-.7.5-1.7,1.1-3,1.8l-.9-1.4c1-.6,2.1-1.2,2.9-1.8,1.1-.7,1.4-1.4,1.4-2.6v-1.4h1.8V14c0,1.2.3,1.9,1.4,2.6.8.5,1.9,1.2,2.9,1.8l-.8,1.3c-1.3-.7-2.3-1.3-3-1.8C139.3,17.5,138.8,17.1,138.7,16.8L138.7,16.8z"/>
    </g></g></g>
    <g><g><g>
      <path fill="#fff" d="M6.6,5.5C5.3,6.1,4.9,6.9,3.8,7.7,5.3,8.1,6.1,6.1,8,5.6,7.5,5.6,7.1,5.7,6.6,5.5z"/>
      <path fill="#fff" d="M5.5,4.7C3.5,5.9,2.9,7.1,1.6,8c1.6.5,2.8-1.9,4.6-2.8C5.9,5.2,5.7,4.9,5.5,4.7z"/>
      <path fill="#fff" d="M2.3,6.7c2.4-2.7,6.3-4.9,10-4.7C9.9,2.7,7.9,4.4,5.8,4.5c1.2,1.4,2.7.5,4,0,1.8-.6,3.6.4,5.5,1.4l0,0c0,0,.3.2,1,.5.8.3,2,.7,4,1,2.3.4,5.5.9,10,.9,0,0-5.1,0-9.3-3.8-.8-.7-1.6-1.6-2.9-2.8S14.8-.1,12.6,0C8,.2,2.8,3.5,0,7.9.9,8.1,1.7,7.4,2.3,6.7z"/>
    </g>
    <path fill="#fff" d="M21,1.5c0,0,3.7.1,7.2,2.6s6.3,4.2,11.5,4c0,0-7.2.6-12.3-1.8C24.2,4.8,22.4,2.2,21,1.5z"/>
    </g>
    <g><g>
      <path fill="#fff" d="M33.1,30.4c1.3-.6,1.7-1.4,2.9-2.2-1.5-.4-2.3,1.6-4.2,2.2C32.2,30.2,32.7,30.2,33.1,30.4z"/>
      <path fill="#fff" d="M34.3,31.2c2-1.2,2.5-2.4,3.8-3.4-1.6-.5-2.8,1.9-4.6,2.8C33.8,30.7,34.1,31,34.3,31.2z"/>
      <path fill="#fff" d="M37.5,29.1c-2.4,2.7-6.3,4.9-10,4.7,2.3-.7,4.3-2.4,6.4-2.5-1.2-1.4-2.7-.5-4,0-1.8.6-3.6-.4-5.5-1.4l0,0c0,0-.3-.2-1-.5-.8-.3-2-.7-4-1-2.3-.4-5.5-.9-10-.9,0,0,5.1,0,9.3,3.8.8.7,1.6,1.6,2.9,2.8,1.4,1.2,3.3,1.7,5.5,1.6,4.6-.2,9.8-3.5,12.6-7.9C38.8,27.7,38.1,28.5,37.5,29.1z"/>
    </g>
    <path fill="#fff" d="M18.8,34.4c0,0-3.7-.1-7.2-2.6s-6.3-4.2-11.5-4c0,0,7.2-.6,12.3,1.8C15.5,31.1,17.3,33.6,18.8,34.4z"/>
    </g></g>
    <g><g>
      <path fill="#fff" d="M10.6,18.5H9.5c-.1,0-.2,0-.3-.1-.1-.1-.1-.1-.2-.2l-.4-1H6.4l-.4,1c0,.1-.1.1-.2.2-.1.1-.2.1-.3.1H4.5l2.3-6h1.4L10.6,18.5z M6.7,16.2h1.6l-.6-1.6c0-.1-.1-.2-.1-.4,0-.1-.1-.3-.1-.5,0,.2-.1.3-.1.5,0,.1-.1.3-.1.4L6.7,16.2z"/>
      <path fill="#fff" d="M13.3,17.4c.2,0,.4,0,.5-.1s.3-.2.4-.3c.1-.1.2-.3.2-.4.1-.2.1-.4.1-.6v-3.6h1.4V16c0,.4-.1.7-.2,1-.1.3-.3.6-.5.8-.2.2-.5.4-.8.5-.3.1-.7.2-1.1.2-.4,0-.8-.1-1.1-.2-.3-.1-.6-.3-.8-.5-.2-.2-.4-.5-.5-.8-.1-.3-.2-.6-.2-1v-3.6h1.4V16c0,.2,0,.4.1.6s.1.3.2.4c.1.1.2.2.4.3S13.2,17.4,13.3,17.4z"/>
      <path fill="#fff" d="M18.2,16.2v2.2h-1.4v-6h2c.4,0,.8,0,1.1.1.3.1.6.2.8.4.2.2.3.3.4.6s.1.5.1.7c0,.2,0,.4-.1.6-.1.2-.1.3-.2.5-.1.1-.2.3-.4.4-.2.1-.3.2-.5.3.1,0,.2.1.3.2s.2.2.2.3l1.3,2.1h-1.3c-.2,0-.4-.1-.5-.3l-1-1.7c0-.1-.1-.1-.2-.2-.1,0-.1,0-.2,0H18.2z M18.2,15.3h.6c.2,0,.4,0,.5-.1.1,0,.2-.1.3-.2s.1-.2.2-.3c0-.1.1-.2.1-.4,0-.3-.1-.5-.3-.6-.2-.1-.4-.2-.8-.2h-.6V15.3z"/>
      <path fill="#fff" d="M24.5,17.4c.2,0,.4,0,.5-.1s.3-.2.4-.3c.1-.1.2-.3.2-.4.1-.2.1-.4.1-.6v-3.6h1.4V16c0,.4-.1.7-.2,1-.1.3-.3.6-.5.8-.2.2-.5.4-.8.5-.3.1-.7.2-1.1.2-.4,0-.8-.1-1.1-.2-.3-.1-.6-.3-.8-.5-.2-.2-.4-.5-.5-.8C22,16.7,22,16.4,22,16v-3.6h1.4V16c0,.2,0,.4.1.6s.1.3.2.4c.1.1.2.2.4.3S24.4,17.4,24.5,17.4z"/>
      <path fill="#fff" d="M31.3,16c.1.1.1.2.1.3,0-.1.1-.2.1-.4.1-.1.1-.2.2-.3l1.5-3c0-.1.1-.1.1-.1,0,0,.1-.1.1-.1,0,0,.1,0,.1,0s.1,0,.2,0h1.1v6h-1.2V15c0-.2,0-.3,0-.5L32,17.6c0,.1-.1.2-.2.2-.1,0-.2.1-.3.1h-.2c-.1,0-.2,0-.3-.1-.1,0-.2-.1-.2-.2l-1.6-3.1c0,.1,0,.2,0,.3,0,.1,0,.2,0,.3v3.4H28v-6h1.1c.1,0,.1,0,.2,0,0,0,.1,0,.1,0,0,0,.1,0,.1.1,0,0,.1.1.1.1l1.5,3C31.2,15.8,31.2,15.9,31.3,16z"/>
    </g>
    <g>
      <path fill="#fff" d="M11.2,21.7h.3c0,0,.1,0,.1,0s0,0,0,.1l.5,1.6c0,.1,0,.1,0,.2,0,.1,0,.1,0,.2,0-.1,0-.1,0-.2,0-.1,0-.1.1-.2l.5-1.6c0,0,0,0,0-.1,0,0,0,0,.1,0h.2c0,0,.1,0,.1,0,0,0,0,0,0,.1l.5,1.6c0,.1,0,.1,0,.2s0,.1,0,.2c0-.1,0-.1,0-.2,0-.1,0-.1,0-.2l.5-1.6c0,0,0,0,0-.1,0,0,0,0,.1,0h.3l-.8,2.5h-.3c0,0-.1,0-.1-.1l-.5-1.7c0,0,0-.1,0-.1,0,0,0-.1,0-.1,0,0,0,.1,0,.1,0,0,0,.1,0,.1l-.5,1.7c0,.1-.1.1-.1.1H12L11.2,21.7z"/>
      <path fill="#fff" d="M16.1,21.7c.1,0,.3,0,.4.1.1,0,.2.1.3.2.1.1.2.2.2.3.1.1.1.3.1.5,0,.1,0,.1,0,.1s0,0-.1,0h-1.6c0,.2,0,.3.1.4,0,.1.1.2.2.3.1.1.1.1.2.2.1,0,.2.1.3.1.1,0,.2,0,.3,0,.1,0,.1-.1.2-.1.1,0,.1-.1.1-.1,0,0,.1,0,.1,0,0,0,.1,0,.1,0l.1.2c-.1.1-.1.1-.2.2-.1,0-.2.1-.2.1-.1,0-.2.1-.3.1-.1,0-.2,0-.3,0-.2,0-.3,0-.5-.1-.1-.1-.3-.1-.4-.3s-.2-.2-.2-.4C15,23.3,15,23.1,15,22.9c0-.2,0-.3.1-.5.1-.1.1-.3.2-.4s.2-.2.4-.3C15.8,21.7,15.9,21.7,16.1,21.7z M16.1,22c-.2,0-.4.1-.5.2-.1.1-.2.3-.2.5h1.3c0-.1,0-.2,0-.3s-.1-.2-.1-.2c-.1-.1-.1-.1-.2-.1C16.3,22,16.2,22,16.1,22z"/>
      <path fill="#fff" d="M18.1,20.6v3.6h-.4v-3.6H18.1z"/>
      <path fill="#fff" d="M19.2,20.6v3.6h-.4v-3.6H19.2z"/>
      <path fill="#fff" d="M19.9,24.2v-2.5h.3c.1,0,.1,0,.1.1l0,.3c.1-.1.2-.2.4-.3.1-.1.3-.1.5-.1.1,0,.3,0,.4.1s.2.1.3.2c.1.1.1.2.2.3,0,.1.1.2.1.4v1.6h-.4v-1.6c0-.2,0-.3-.1-.4C21.3,22.1,21.1,22,21,22c-.1,0-.2,0-.4.1s-.2.1-.3.2v1.8H19.9z"/>
      <path fill="#fff" d="M23.4,21.7c.1,0,.3,0,.4.1.1,0,.2.1.3.2.1.1.2.2.2.3.1.1.1.3.1.5,0,.1,0,.1,0,.1s0,0-.1,0h-1.6c0,.2,0,.3.1.4,0,.1.1.2.2.3.1.1.1.1.2.2.1,0,.2.1.3.1.1,0,.2,0,.3,0,.1,0,.1-.1.2-.1.1,0,.1-.1.1-.1,0,0,.1,0,.1,0,0,0,.1,0,.1,0l.1.2c-.1.1-.1.1-.2.2-.1,0-.2.1-.2.1-.1,0-.2.1-.3.1-.1,0-.2,0-.3,0-.2,0-.3,0-.5-.1-.1-.1-.3-.1-.4-.3s-.2-.2-.2-.4c-.1-.2-.1-.4-.1-.6,0-.2,0-.3.1-.5.1-.1.1-.3.2-.4s.2-.2.4-.3C23.1,21.7,23.3,21.7,23.4,21.7z M23.5,22c-.2,0-.4.1-.5.2-.1.1-.2.3-.2.5h1.3c0-.1,0-.2,0-.3s-.1-.2-.1-.2c-.1-.1-.1-.1-.2-.1C23.6,22,23.6,22,23.5,22z"/>
      <path fill="#fff" d="M26.3,22.1C26.3,22.2,26.3,22.2,26.3,22.1c-.1.1-.1,0-.2,0s-.1,0-.1-.1c0,0-.1,0-.2-.1s-.1,0-.2,0c-.1,0-.1,0-.2,0-.1,0-.1,0-.1.1s-.1.1-.1.1c0,0,0,.1,0,.1,0,.1,0,.1.1.2,0,0,.1.1.1.1.1,0,.1.1.2.1.1,0,.2,0,.2.1.1,0,.2.1.2.1.1,0,.1.1.2.1.1,0,.1.1.1.2,0,.1.1.2.1.3,0,.1,0,.2-.1.3,0,.1-.1.2-.2.2s-.2.1-.3.2c-.1,0-.2.1-.4.1-.2,0-.3,0-.5-.1s-.3-.1-.4-.2l.1-.2c0,0,0,0,0,0,0,0,0,0,.1,0s.1,0,.1,0s.1,0,.1.1s.1.1.2.1c.1,0,.1,0,.2,0,.1,0,.2,0,.2,0,.1,0,.1-.1.2-.1s.1-.1.1-.1c0,0,0-.1,0-.2,0-.1,0-.1-.1-.2,0,0-.1-.1-.1-.1-.1,0-.1-.1-.2-.1-.1,0-.2,0-.2-.1-.1,0-.2-.1-.2-.1-.1,0-.1-.1-.2-.1-.1,0-.1-.1-.1-.2,0-.1-.1-.2-.1-.3,0-.1,0-.2.1-.3,0-.1.1-.2.2-.2s.2-.1.3-.2c.1,0,.2-.1.4-.1.2,0,.3,0,.4.1.1.1.2.1.3.2L26.3,22.1z"/>
      <path fill="#fff" d="M28.3,22.1C28.3,22.2,28.3,22.2,28.3,22.1c-.1.1-.1,0-.2,0s-.1,0-.1-.1c0,0-.1,0-.2-.1s-.1,0-.2,0c-.1,0-.1,0-.2,0-.1,0-.1,0-.1.1s-.1.1-.1.1c0,0,0,.1,0,.1,0,.1,0,.1.1.2,0,0,.1.1.1.1.1,0,.1.1.2.1.1,0,.2,0,.2.1.1,0,.2.1.2.1.1,0,.1.1.2.1.1,0,.1.1.1.2,0,.1.1.2.1.3,0,.1,0,.2-.1.3,0,.1-.1.2-.2.2s-.2.1-.3.2c-.1,0-.2.1-.4.1-.2,0-.3,0-.5-.1s-.3-.1-.4-.2l.1-.2c0,0,0,0,0,0,0,0,0,0,.1,0s.1,0,.1,0s.1,0,.1.1s.1.1,.2.1c.1,0,.1,0,.2,0,.1,0,.2,0,.2,0,.1,0,.1-.1.2-.1s.1-.1.1-.1c0,0,0-.1,0-.2,0-.1,0-.1-.1-.2,0,0-.1-.1-.1-.1-.1,0-.1-.1-.2-.1-.1,0-.2,0-.2-.1-.1,0-.2-.1-.2-.1-.1,0-.1-.1-.2-.1-.1,0-.1-.1-.1-.2,0-.1-.1-.2-.1-.3,0-.1,0-.2.1-.3,0-.1.1-.2.2-.2s.2-.1.3-.2c.1,0,.2-.1.4-.1.2,0,.3,0,.4.1.1.1.2.1.3.2L28.3,22.1z"/>
    </g></g>
  </svg>
);

const BadgeDeco = () => (
  <div className="pg-badge-deco"><span className="line"></span><span className="diamond"></span><span className="line"></span></div>
);
const BadgeSep = () => (
  <div className="pg-badge-sep"><span className="line"></span><span className="dot"></span><span className="line"></span></div>
);

export default function ProposalPage() {
  return (
    <>
      {/* Sticky Top Bar */}
      <div className="proposal-topbar">
        <Link href="/" className="topbar-back">
          &#8592; 메인으로
        </Link>
        <a href="/AurumWellness_Proposal_2026.pdf" download className="topbar-download">
          PDF 다운로드
        </a>
      </div>

      <div className="proposal-container">
        {/* P1: COVER */}
        <div className="page" id="p1">
          <div className="cover-bg">
            <img src="/images/hero/sub_vis02.jpg" alt="" />
            <div className="cover-overlay"></div>
          </div>
          <div className="cover-content">
            <AurumLogo className="cover-logo" />
            <div className="cover-title">AURUM WELLNESS<br />SERVICE</div>
            <div className="cover-line"></div>
            <div className="cover-sub">아우름 웰니스 서비스 제안서</div>
          </div>
        </div>

        {/* P2: WHY WELLNESS */}
        <div className="page dark-page" id="p2">
          <div className="pi">
            <div className="section-header">
              <div className="sl">WHY WELLNESS</div>
              <div className="sh-line"></div>
              <div className="st">기업 웰니스는 선택이 아닌 필수,<br />테라피가 그 핵심입니다</div>
              <div className="sh-line"></div>
              <div className="sh-sub">언론이 주목하는 기업 웰니스 트렌드</div>
            </div>

            <div className="news-grid">
              <div className="news-card">
                <img src="/images/proposal/news/news1.png" alt="뉴스1" />
                <div className="news-body">
                  <div className="news-title">직원 위해 마사지사 6명 고용한 회사…<br className="m" />MZ 몰리는 이유 있었네</div>
                  <div className="news-src">머니투데이</div>
                </div>
              </div>
              <div className="news-card">
                <img src="/images/proposal/news/news2.png" alt="뉴스2" />
                <div className="news-body">
                  <div className="news-title">&lsquo;직장인 스트레스&rsquo;…번아웃 위험군 늘어나고 있다</div>
                  <div className="news-src">잡코리아</div>
                </div>
              </div>
              <div className="news-card">
                <img src="/images/proposal/news/news3.png" alt="뉴스3" />
                <div className="news-body">
                  <div className="news-title">웰니스 프로그램,<br />기업과 구성원을 건강하게</div>
                  <div className="news-src">LG경영연구원</div>
                </div>
              </div>
              <div className="news-card news-hide-mobile">
                <img src="/images/proposal/news/news4.png" alt="뉴스4" />
                <div className="news-body">
                  <div className="news-title">웰니스 복지 : 건강에 대한 임직원의 관심 증대</div>
                  <div className="news-src">HR 인사이트</div>
                </div>
              </div>
              <div className="news-card news-hide-mobile">
                <img src="/images/proposal/news/news5.png" alt="뉴스5" />
                <div className="news-body">
                  <div className="news-title">건강 지능이 경쟁력 된다,<br />몸 관리의 경영화</div>
                  <div className="news-src">이비즈타임즈</div>
                </div>
              </div>
              <div className="news-card news-hide-mobile">
                <img src="/images/proposal/news/news6.png" alt="뉴스6" />
                <div className="news-body">
                  <div className="news-title">&lsquo;번아웃&rsquo;,<br />혼자서 버티지 마세요</div>
                  <div className="news-src">중부일보</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P3: ABOUT US */}
        <div className="page light-page" id="p3">
          <div className="pi">
            <div className="section-header">
              <div className="sl">ABOUT US</div>
              <div className="sh-line"></div>
              <div className="st">마사지를 넘어,<br />피지컬 케어와 힐링 프로그램으로</div>
            </div>
            <div className="intro-text">
              <span className="intro-company">아우름웰니스는</span>
              <span className="ip">마사지 테라피스트 및 필라테스, 요가, 메이크업 아티스트, 컬러 테라피 등 다양한 분야의 전문가들이</span>
              <span className="ip">맞춤형 테라피 서비스를 제공하는 <span className="intro-highlight">B2B 종합복지서비스 전문업체</span>입니다. 기업의 니즈에 맞춰 찾아가는 서비스로, 임직원 건강과 웰니스를 책임집니다.</span>
            </div>

            <div className="track-row">
              <div className="track-card">
                <img src="/images/b2b/sub0201_3.jpg" alt="기업 복지 서비스" />
                <div className="track-body">
                  <div className="track-title">기업 임직원 복지 서비스</div>
                  <div className="track-desc">
                    정기적 사내 피지컬 케어, 체형교정 프로그램, 힐링 테라피 등
                    임직원의 건강과 업무 효율을 동시에 높이는 맞춤 복지를 제공합니다.
                  </div>
                  <div className="track-tags">
                    <span className="tag">체어 테라피</span>
                    <span className="tag">핸드 테라피</span>
                    <span className="tag">체형교정</span>
                    <span className="tag">테라피 클래스</span>
                  </div>
                </div>
              </div>
              <div className="track-card">
                <img src="/images/b2b/sub0201_4.jpg" alt="VIP 브랜드 이벤트" />
                <div className="track-body">
                  <div className="track-title">VIP &middot; 브랜드 이벤트</div>
                  <div className="track-desc">
                    프리미엄 골프대회, 신제품 런칭쇼, 백화점 VIP 고객 대상의
                    고품격 힐링 테라피로 브랜드 경험을 한 차원 높여드립니다.
                  </div>
                  <div className="track-tags">
                    <span className="tag">골프대회</span>
                    <span className="tag">런칭쇼</span>
                    <span className="tag">VIP 케어</span>
                    <span className="tag">세미나</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-row">
              <div className="why-card">
                <div className="why-thumb"><img src="/images/b2b/why_01.jpg" alt="맞춤형 테라피" /></div>
                <div className="why-body">
                  <div className="why-num">01</div>
                  <div className="why-text">
                    <div className="why-title">맞춤형 테라피 서비스</div>
                    <div className="why-desc">원하는 시간과 장소에서 기업 니즈에 맞춘 테라피 제공</div>
                  </div>
                </div>
              </div>
              <div className="why-card">
                <div className="why-thumb"><img src="/images/b2b/why_02.jpg" alt="업무 집중력" /></div>
                <div className="why-body">
                  <div className="why-num">02</div>
                  <div className="why-text">
                    <div className="why-title">업무 집중력 향상</div>
                    <div className="why-desc">임직원 스트레스 해소로 업무 효율 및 기업 성장 도모</div>
                  </div>
                </div>
              </div>
              <div className="why-card">
                <div className="why-thumb"><img src="/images/b2b/why_03.jpg" alt="체감형 복지" /></div>
                <div className="why-body">
                  <div className="why-num">03</div>
                  <div className="why-text">
                    <div className="why-title">체감형 복지</div>
                    <div className="why-desc">높은 임직원 만족도와 애사심 고취 효과</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P4: LEAD THERAPIST */}
        <div className="page light-page" id="p4">
          <div className="pi">
            <div className="section-header">
              <div className="sl">LEAD THERAPIST</div>
              <div className="sh-line"></div>
              <div className="st">글로벌 기업이 선택한<br className="m" /> 과학적 테라피<br className="d" /> 아우름 웰니스</div>
            </div>

            <div className="therapist-top">
              <div className="instructor-col">
                <div className="col-label">Instructor</div>
                <div className="therapist-name">김순재</div>
                <div className="therapist-role">대표 강사 &middot; 체육학 석사</div>
                <div className="therapist-photo">
                  <img src="/images/b2b/sub0201_1.png" alt="김순재 대표 테라피스트" />
                </div>
                <ul className="cred-list">
                  <li>한국체육대학교 체육학 석사 (건강교육학 전공)</li>
                  <li>미용사 (피부) 국가자격</li>
                  <li>생활스포츠지도사 2급 (보디빌딩)</li>
                  <li>ACSM-Korea PFT (미국스포츠의학회 퍼스널 트레이너)</li>
                  <li>한국체육대학교 한국응용해부연구소 협력기관</li>
                  <li>한국응용의과학협회 정회원</li>
                  <li>이화여자대학교병원 카데바 해부 워크샵</li>
                  <li>FISAF KOREA Certified Instructor</li>
                  <li>FISAF KOREA Corrective/Medical Training Certificate</li>
                  <li>RTS(재활전문가) LV1, 2 Certificate</li>
                  <li>마사지 &amp; 바디워크 대체의학 / 마요테라피 수료</li>
                  <li>나레스트 뷰티 아카데미 Skin Care Certificate</li>
                  <li>키네시오 테이핑 Legacy Symposium Certificate</li>
                </ul>
              </div>

              <div className="experience-col">
                <div className="col-label">Experience</div>
                <div className="exp-title">강의 및 특강 경력</div>
                <div className="timeline">
                  {[
                    { company: '네이버 그린웹서비스', desc: '임직원 상호테라피 클래스 (3회)' },
                    { company: '대림바스 X 아모레퍼시픽', desc: '핸드테라피 클래스 (4회)' },
                    { company: 'WeWork / Fastfive', desc: '상호/핸드 테라피 클래스 (3회)' },
                    { company: '시셰이도', desc: '임직원 대상 핸드 테라피 클래스' },
                    { company: '서울대 어린이병원', desc: '핸드테라피 봉사 클래스' },
                    { company: '카카오 T 히어로즈', desc: '임직원 테라피 클래스' },
                    { company: '한국콘텐츠진흥원', desc: '임직원 건강관리 테라피' },
                    { company: '노인복지관 / 종합복지관', desc: '핸드테라피 클래스' },
                    { company: '치매예방협회', desc: '강사 대상 핸드테라피 클래스' },
                  ].map((item, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-company">{item.company}</div>
                      <div className="timeline-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="timeline-footer">
                  <span></span>상기 내용 외 다양한 강의 진행<span></span>
                </div>
              </div>
            </div>

            <div className="activity-strip">
              <div className="act-card">
                <img src="/images/b2b/act_01.png" alt="기업 복지 현장" />
                <div className="act-label">기업 임직원 피지컬 케어</div>
              </div>
              <div className="act-card">
                <img src="/images/b2b/act_02.png" alt="테라피 클래스" />
                <div className="act-label">핸드테라피 클래스</div>
              </div>
              <div className="act-card">
                <img src="/images/b2b/act_03.png" alt="체어 테라피" />
                <div className="act-label">체어 테라피</div>
              </div>
              <div className="act-card">
                <img src="/images/b2b/act_04.png" alt="기업 특강" />
                <div className="act-label">기업 특강 진행</div>
              </div>
            </div>
          </div>
        </div>

        {/* P5: SERVICE PROGRAMS — Body Therapy */}
        <div className="page light-page" id="p5">
          <div className="pi">
            <div className="section-header">
              <div className="sl">SERVICE PROGRAMS</div>
              <div className="sh-line"></div>
              <div className="st">기업 니즈에 따른 맞춤 테라피 서비스</div>
            </div>

            <div className="pg-text-band">
              <div className="pg-band-left">
                <div className="pg-band-label">BODY</div>
                <div className="pg-band-title">바디 케어</div>
                <div className="pg-band-divider"></div>
              </div>
              <div className="pg-band-sep"></div>
              <div className="pg-band-desc">해부학에 기반한 전문 바디 테라피. 피부와 근육을 동시에 케어하며,<br className="m" />단순 뷰티 관리를 넘어 체형 교정까지 아우르는 통합 바디 케어 프로그램.</div>
            </div>

            <div className="pg-grid">
              {[
                { img: 'chair_therapy.png', name: '체어 테라피', en: 'Chair Therapy' },
                { img: 'relax_chair.png', name: '릴렉스 테라피', en: 'Relax Chair Therapy' },
                { img: 'hand_therapy.png', name: '핸드 테라피', en: 'Hand Therapy' },
                { img: 'foot_therapy.png', name: '풋 테라피', en: 'Foot Therapy' },
                { img: 'bed_therapy.png', name: '베드 테라피', en: 'Bed Therapy' },
                { img: 'clinical_therapy.png', name: '클리니컬 테라피', en: 'Clinical Therapy' },
              ].map((card, i) => (
                <div key={i} className="pg-card">
                  <img src={`/images/proposal/${card.img}`} alt={card.name} />
                  <div className="pg-overlay"></div>
                  <div className="pg-badge">
                    <BadgeDeco />
                    <div className="pg-badge-cat">BODY</div>
                    <div className="pg-badge-name">{card.name}</div>
                    <BadgeSep />
                    <div className="pg-badge-en">{card.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* P6: EXERCISE & CUSTOM THERAPY */}
        <div className="page light-page" id="p6">
          <div className="pi" style={{ gap: '2px' }}>
            <div className="pg-section">
              <div className="pg-text-band">
                <div className="pg-band-left">
                  <div className="pg-band-label">EXERCISE</div>
                  <div className="pg-band-title">운동 테라피</div>
                  <div className="pg-band-divider"></div>
                </div>
                <div className="pg-band-sep"></div>
                <div className="pg-band-desc">스트레칭과 코어 중심 근육 단련으로 유연성을 향상시키고,<br className="m" />몸의 밸런스를 맞추어 체형 교정에 도움을 주는 프로그램.</div>
              </div>
              <div className="pg-image-row">
                <div className="pg-card">
                  <img src="/images/proposal/yoga.png" alt="요가 클래스" />
                  <div className="pg-overlay"></div>
                  <div className="pg-badge">
                    <BadgeDeco />
                    <div className="pg-badge-cat">EXERCISE</div>
                    <div className="pg-badge-name">요가 클래스</div>
                    <BadgeSep />
                    <div className="pg-badge-en">Yoga Class</div>
                  </div>
                </div>
                <div className="pg-card">
                  <img src="/images/proposal/pilates.png" alt="필라테스 클래스" />
                  <div className="pg-overlay"></div>
                  <div className="pg-badge">
                    <BadgeDeco />
                    <div className="pg-badge-cat">EXERCISE</div>
                    <div className="pg-badge-name">필라테스 클래스</div>
                    <BadgeSep />
                    <div className="pg-badge-en">Pilates Class</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pg-section">
              <div className="pg-text-band">
                <div className="pg-band-left">
                  <div className="pg-band-label">CUSTOM</div>
                  <div className="pg-band-title">맞춤 테라피</div>
                  <div className="pg-band-divider"></div>
                </div>
                <div className="pg-band-sep"></div>
                <div className="pg-band-desc">퍼스널 컬러를 찾는 메이크업 클래스부터 직원 간 유대감을 높이는<br className="m" />상호 테라피 특강까지, 기업 니즈에 맞춘 맞춤형 프로그램.</div>
              </div>
              <div className="pg-image-row">
                <div className="pg-card">
                  <img src="/images/proposal/makeup_color.png" alt="메이크업 컬러테라피" />
                  <div className="pg-overlay"></div>
                  <div className="pg-badge">
                    <BadgeDeco />
                    <div className="pg-badge-cat">CUSTOM</div>
                    <div className="pg-badge-name">메이크업 &middot; 컬러테라피</div>
                    <BadgeSep />
                    <div className="pg-badge-en">Makeup &amp; Color Therapy</div>
                  </div>
                </div>
                <div className="pg-card">
                  <img src="/images/proposal/therapy_workshop.png" alt="테라피 특강" />
                  <div className="pg-overlay"></div>
                  <div className="pg-badge">
                    <BadgeDeco />
                    <div className="pg-badge-cat">CUSTOM</div>
                    <div className="pg-badge-name">테라피 특강</div>
                    <BadgeSep />
                    <div className="pg-badge-en">Therapy Workshop</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P8: TRACK RECORD */}
        <div className="page light-page" id="p8">
          <div className="pi">
            <div className="section-header">
              <div className="sl">TRACK RECORD</div>
              <div className="sh-line"></div>
              <div className="st">숫자가 증명하는 아우름웰니스의 실력</div>
            </div>

            <div className="big-stats">
              <div className="big-stat"><div className="num">15</div><div className="unit">Years &middot; 업력</div></div>
              <div className="big-stat"><div className="num">200+</div><div className="unit">Clients &middot; 기업 고객</div></div>
              <div className="big-stat"><div className="num">5,000+</div><div className="unit">Sessions &middot; 현장 진행</div></div>
              <div className="big-stat"><div className="num">100%</div><div className="unit">Satisfaction &middot; 만족도</div></div>
            </div>

            <div className="partner-layout">
              <div className="partner-left">
                <div className="partner-label">PARTNERS</div>
                <div className="partner-heading">주요 고객사</div>
                <div className="chip-group">
                  <div className="chip-group-label">기업 임직원</div>
                  <div className="chip-list">
                    {['삼성전자','삼성화재','네이버','카카오','LG에너지솔루션','P&G','BCG','SK하이닉스','KB국민카드','이마트','현대오일뱅크','워커힐','산업은행','국세청','인천공항공사','한국관광공사','서울주택도시공사','한국서부발전','인천시청','원주시청'].map(c => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="chip-group">
                  <div className="chip-group-label">공유오피스</div>
                  <div className="chip-list">
                    {['WeWork','패스트파이브','스파크플러스','CEO SUITE'].map(c => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="chip-group">
                  <div className="chip-group-label">VIP &middot; 브랜드</div>
                  <div className="chip-list">
                    {['BMW','벤츠','페라리','람보르기니','렉서스','폭스바겐','하나카드','잭니클라우스','파라다이스카지노','록시땅','KLPGA','롯데백화점','현대백화점'].map(c => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="chip-group">
                  <div className="chip-group-label">신제품 &middot; 세미나</div>
                  <div className="chip-list">
                    {['아모레퍼시픽','모로칸오일','세타필','연세 메디치 페스티발','롯데재단','시셰이도','SK텔레콤','HD현대오일뱅크','한국산업은행','SONY'].map(c => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="partner-right">
                <div className="logo-grid">
                  {Array.from({ length: 25 }, (_, i) => i + 2).map(n => (
                    <div key={n} className="logo-cell">
                      <img src={`/images/logos/main9_${n}.jpg`} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* P9: REVIEWS */}
        <div className="page light-page" id="p9">
          <div className="pi">
            <div className="section-header">
              <div className="sl">CLIENT REVIEWS</div>
              <div className="sh-line"></div>
              <div className="st">고객이 증명하는<br className="m" /> 아우름웰니스의 전문성</div>
            </div>

            <div className="review-grid">
              {[
                { text: '"매주 정기적으로 진행하는 체어테라피 덕분에 목 통증이 많이 줄었어요. 직원들이 가장 좋아하는 복지입니다."', author: 'IT기업 인사담당자 정승*', company: '네이버', tag: '체어 테라피' },
                { text: '"핸드테라피가 이렇게 좋은 줄 몰랐어요. 짧은 시간에도 확실한 릴렉싱 효과가 있어서 행사 만족도가 높았습니다."', author: '마케팅팀 김예*', company: '아모레퍼시픽', tag: '핸드 테라피' },
                { text: '"체형교정 프로그램으로 오랜 거북목이 개선되었습니다. 전문 테라피스트의 실력이 정말 다르다는 걸 느꼈어요."', author: '입주기업 직원 박지*', company: 'WeWork 선릉', tag: '체형교정' },
                { text: '"100명 규모 골프대회 행사였는데, 준비부터 마무리까지 너무 깔끔하게 진행해주셔서 다음 행사도 바로 예약했습니다."', author: '이벤트팀 이수*', company: 'BMW Korea', tag: 'VIP 골프대회' },
              ].map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <div className="review-text">{r.text}</div>
                  <div className="review-author">{r.author} <span>&middot; {r.company}</span> <span className="review-tag">{r.tag}</span></div>
                </div>
              ))}
            </div>

            <div className="feedback-label">REAL FEEDBACK</div>

            <div className="kakao-row">
              {[
                {
                  title: '마사지 클래스 피드백',
                  bg: 'linear-gradient(135deg,#7986a8,#5c6a8a)',
                  name: '기업복지 담당자',
                  msg1: '정말 유익한 행사였습니다^^ 참가자들은 물론 저희 내부에서도 반응이 무척 좋았습니다~',
                  msg2: '다음 클래스에도 재미있게 함께 진행할 수 있음 좋겠습니다~ 감사합니다^^',
                  time: '오후 6:44',
                },
                {
                  title: '월간 정기 테라피 후기',
                  bg: 'linear-gradient(135deg,#a8947d,#8a7a66)',
                  name: 'HR 매니저',
                  msg1: '덕분에 한 달 동안 즐거운 경험을 했습니다~ 좋은 기회를 마련해 주셔서 다시 한번 감사하단 인사드려요 :)',
                  msg2: '특히 모든 직원분들을 친절히 대해 주셔서 아주 편안하게 진행했어요~ 감사드립니다.',
                  time: '오후 7:49',
                },
                {
                  title: '공유오피스 입점 서비스',
                  bg: 'linear-gradient(135deg,#8ba89e,#6a8a7e)',
                  name: '공유오피스 매니저',
                  msg1: '대표님, 한달동안 너무 잘 진행해주셔서 감사드립니다 :) 직원분들이 매우 흡족해하셔서 대표님 사업에 관심이시더라고요^^',
                  msg2: '따로 여쭤주시는 분들은 제가 명함 건네드린다고 했습니다~',
                  time: '오후 9:02',
                },
              ].map((chat, i) => (
                <div key={i}>
                  <div className="kakao-title">{chat.title}</div>
                  <div className="kakao-chat">
                    <div className="kakao-msg">
                      <div className="kakao-avatar">
                        <div className="kakao-avatar-placeholder" style={{ background: chat.bg }}>&#128100;</div>
                      </div>
                      <div className="kakao-body">
                        <div className="kakao-name">{chat.name}</div>
                        <div className="kakao-bubble-wrap">
                          <div className="kakao-bubble">{chat.msg1}</div>
                          <div className="kakao-time">{chat.time}</div>
                        </div>
                      </div>
                    </div>
                    <div className="kakao-bubble-cont">
                      <div className="kakao-bubble">{chat.msg2}</div>
                      <div className="kakao-time">{chat.time}</div>
                    </div>
                    <div className="kakao-from">{chat.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="survey-row">
              <div className="survey-card">
                <div className="survey-q">4. 피지컬케어 서비스가 얼마나 도움이 되셨습니까?<br /><span style={{ fontSize: '8px', fontWeight: 400, color: 'var(--proposal-text-muted)' }}>0(전혀 도움이 되지 않았다)부터 10(매우 도움이 되었다)까지의 숫자를 적어 주십시오.</span></div>
                <div className="survey-answer">
                  <span className="survey-score">10</span>
                </div>
                <div className="survey-comment-label">기타 소감:</div>
                <div className="survey-comment">최고입니다. 시간이 짧게 느껴지네요. 정기적으로 시행하기를 희망합니다!</div>
              </div>

              <div className="survey-card">
                <div className="survey-q">5. 피지컬케어 서비스를 동료에게 추천하시겠습니까?</div>
                <div className="survey-answer">
                  <div className="survey-checks">
                    <div className="survey-check"><span className="box checked">&#10003;</span> 예</div>
                    <div className="survey-check"><span className="box"></span> 아니오</div>
                  </div>
                </div>
                <div className="survey-q" style={{ marginTop: '8px' }}>6. 향후에도 피지컬케어를 받을 의향이 있다.</div>
                <div className="survey-answer">
                  <div className="survey-checks">
                    <div className="survey-check"><span className="box checked">&#10003;</span> 예</div>
                    <div className="survey-check"><span className="box"></span> 아니오</div>
                  </div>
                </div>
                <div className="survey-comment-label">기타 소감:</div>
                <div className="survey-comment">33년 인생 최고의 케어 였습니다</div>
              </div>

              <div className="survey-card">
                <div className="survey-q">4. 피지컬케어 서비스가 얼마나 도움이 되셨습니까?</div>
                <div className="survey-answer">
                  <span className="survey-score">10</span>
                </div>
                <div className="survey-q" style={{ marginTop: '8px' }}>5. 동료에게 추천하시겠습니까?</div>
                <div className="survey-answer">
                  <div className="survey-checks">
                    <div className="survey-check"><span className="box checked">&#10003;</span> 예</div>
                    <div className="survey-check"><span className="box"></span> 아니오</div>
                  </div>
                </div>
                <div className="survey-comment-label">기타 소감:</div>
                <div className="survey-comment">왼쪽 허리가 많이 아팠는데 짧은 시간에 많이 좋아진 것 같습니다</div>
              </div>
            </div>

            <div className="closing-quote">
              <div className="cq-highlight">&ldquo;33년 인생 최고의 케어&rdquo;라는 극찬.</div>
              <div className="cq-main">직원들이 다음 월요일을 기다리게 만드는 최고의 복지.<br /><span className="cq-brand">&lsquo;아우름 웰니스&rsquo;</span>입니다.</div>
            </div>
          </div>
        </div>

        {/* P10: PRICING */}
        <div className="page light-page" id="p10">
          <div className="pi">
            <div className="section-header">
              <div className="sl">PRICING</div>
              <div className="sh-line"></div>
              <div className="st">투명한 단가, 합리적인 서비스</div>
            </div>

            <table className="price-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>프로그램</th>
                  <th style={{ width: '14%' }}>인당 시간</th>
                  <th style={{ width: '14%' }}>2시간</th>
                  <th style={{ width: '14%' }}>3시간</th>
                  <th style={{ width: '14%' }}>4시간</th>
                  <th style={{ width: '16%' }}>추가 1시간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="cat-header">피지컬 케어</span><br />핸드 마사지</td>
                  <td className="time-col">8~15분</td>
                  <td>200,000</td>
                  <td>250,000</td>
                  <td>300,000</td>
                  <td>50,000</td>
                </tr>
                <tr>
                  <td>스파인/릴렉스 체어</td>
                  <td className="time-col">10~30분</td>
                  <td>300,000</td>
                  <td>350,000</td>
                  <td>400,000</td>
                  <td>50,000</td>
                </tr>
                <tr>
                  <td>베드 테라피, 풋 테라피</td>
                  <td className="time-col">30분~1시간</td>
                  <td>350,000</td>
                  <td>400,000</td>
                  <td>450,000</td>
                  <td>50,000</td>
                </tr>
                <tr>
                  <td>클리니컬 테라피</td>
                  <td className="time-col">30분~1시간</td>
                  <td>500,000</td>
                  <td>600,000</td>
                  <td>700,000</td>
                  <td>100,000</td>
                </tr>
                <tr>
                  <td><span className="cat-header">교육 &middot; 운동 &middot; 맞춤</span><br />특강/요가/필라테스/메이크업</td>
                  <td className="time-col">1~3시간</td>
                  <td>300,000</td>
                  <td>400,000</td>
                  <td>600,000</td>
                  <td>&mdash;</td>
                </tr>
              </tbody>
            </table>

            <div className="price-notes">
              &middot; 금액은 테라피스트/강사 1인당 비용, 부가세 불포함 기준 (단위: 원)<br />
              &middot; 시간은 식사시간 제외, 휴식시간 포함 기준<br />
              &middot; 재료비 포함, 교통비&middot;출장비는 지역에 따라 추가 및 별도 협의<br />
              &middot; 상기 단가표 외 시간 협의 및 비용 조정 가능
            </div>

            <div className="recommend-label">추천 조합</div>
            <div className="recommend-row">
              <div className="rec-card">
                <div className="rec-name">Basic</div>
                <div className="rec-top">
                  <div className="rec-desc">소규모 팀을 위한 기본 구성.<br />가장 인기 있는 체어 테라피 단독 운영.</div>
                  <div className="rec-price">350,000원 <span>/ 3시간</span></div>
                </div>
                <ul className="rec-features">
                  <li>체어 테라피 3시간</li>
                  <li>테라피스트 1인 배치</li>
                  <li>약 8~12명 케어</li>
                  <li>10~30분 / 인당</li>
                </ul>
              </div>
              <div className="rec-card">
                <div className="rec-name">Standard</div>
                <div className="rec-top">
                  <div className="rec-desc">체어와 핸드를 함께 운영하여<br />만족도 극대화.</div>
                  <div className="rec-price">700,000원 <span>/ 4시간</span></div>
                </div>
                <ul className="rec-features">
                  <li>체어 + 핸드 테라피 4시간</li>
                  <li>테라피스트 2인 배치</li>
                  <li>약 15~20명 케어</li>
                  <li>프로그램 자유 선택</li>
                </ul>
              </div>
              <div className="rec-card featured">
                <div className="rec-badge">Popular</div>
                <div className="rec-name">Premium</div>
                <div className="rec-top">
                  <div className="rec-desc">VIP 행사 및 대규모 이벤트에 최적화된 프리미엄 구성.</div>
                  <div className="rec-price">별도 협의</div>
                </div>
                <ul className="rec-features">
                  <li>베드 + 체어 + 핸드 6시간</li>
                  <li>테라피스트 3인 이상</li>
                  <li>VIP 맞춤 프로그램</li>
                  <li>행사 기획&middot;운영 포함</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* P11: THANK YOU */}
        <div className="page" id="p11">
          <div className="thankyou-content">
            <AurumLogo className="thankyou-logo" />
            <div className="thankyou-main">감사합니다</div>
            <div className="thankyou-line"></div>
            <div className="thankyou-phone">010-2981-9989</div>
            <div className="thankyou-contact">
              victsoon@naver.com<br />
              인천광역시 부평구 부평대로 71, 3층<br />
              <span className="gold">aurumwellness.co.kr</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
