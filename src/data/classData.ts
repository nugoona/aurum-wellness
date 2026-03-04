/* Class page static data — 원본: AURUM_SITE_CONTENT.md */

export const INSTRUCTOR = {
  name: '김순재',
  role: '대표 강사 · 체육학 석사',
  quote:
    '교육생 한 명, 한 명이 현장에서 바로 통하는 전문가로 성장할 수 있도록, 저의 모든 노하우를 쏟아붓겠습니다.',
  image: '/images/class/sub0301_2.png',
  credentials: [
    '한국체육대학교 체육학 석사 (건강교육학 전공)',
    '미용사 (피부) 국가자격',
    '생활스포츠지도사 2급 (보디빌딩)',
    'ACSM-Korea PFT (미국스포츠의학회 퍼스널 트레이너)',
    '한국체육대학교 한국응용해부연구소 협력기관',
    '한국응용의과학협회 정회원',
    '이화여자대학교병원 카데바 해부 워크샵',
    'FISAF KOREA Certified Instructor',
    'FISAF KOREA Corrective/Medical Training Certificate',
    'RTS(재활전문가) LV1, 2 Certificate',
    '마사지 & 바디워크 대체의학 / 마요테라피 수료',
    '나레스트 뷰티 아카데미 Skin Care Certificate',
    '키네시오 테이핑 Legacy Symposium Certificate',
  ],
};

export const TIMELINE = [
  { company: '네이버 그린웹서비스', desc: '임직원 상호테라피 클래스 (3회)' },
  { company: '대림바스 X 아모레퍼시픽', desc: '핸드테라피 클래스 (4회)' },
  { company: 'WeWork / Fastfive', desc: '상호/핸드 테라피 클래스 (3회)' },
  { company: '시셰이도', desc: '임직원 대상 핸드 테라피 클래스' },
  { company: '서울대 어린이병원', desc: '핸드테라피 봉사 클래스' },
  { company: '카카오 T 히어로즈', desc: '임직원 테라피 클래스' },
  { company: '한국콘텐츠진흥원', desc: '임직원 건강관리 테라피' },
  { company: '노인복지관 / 종합복지관', desc: '핸드테라피 클래스' },
  { company: '치매예방협회', desc: '강사 대상 핸드테라피 클래스' },
];

export const TIMELINE_IMAGES = [
  '/images/class/event_daelim1_01.jpg',  // 대림디움 해피바스 1회차 (대표 이미지)
  '/images/class/event_snuh_01.jpg',     // 서울대 어린이병원
  '/images/class/event_kakao_01.jpg',    // 카카오 T 히어로즈
  '/images/class/event_kocca_01.jpg',    // 한국콘텐츠진흥원
  '/images/class/event_greenweb_01.jpg', // 그린웹서비스
  '/images/class/event_daelim2_01.jpg',  // 대림디움 해피바스 2회차
  '/images/class/event_academy_01.jpg',  // 아카데미 자체교육
];

export const CLASSES = [
  {
    title: '원데이 특강',
    subtitle: '하루만에 배우는 기초 테크닉',
    desc: '바쁜 일상 속에서도 기초 수기 테크닉을 쉽게 배우고 경험할 수 있는 프로그램입니다. 일반인부터 초보자, 운동 전문가들까지 모두를 대상으로 하며, 회사 워크샵이나 기업 건강 특강으로도 인기가 높습니다.',
    mobileDesc: '기초 수기 테크닉을 하루만에 배우는 프로그램입니다. 초보자부터 전문가, 기업 워크샵까지 폭넓게 활용됩니다.',
    image: '/images/class/event_kakao_02.jpg',
    features: [
      '하루 교육으로 실생활에서 바로 활용할 수 있는 테라피 기초 지식 제공',
      '몸의 피로를 스스로 풀고 건강을 관리하는 방법 습득',
      '쉽고 실용적인 구성으로 누구나 부담 없이 참여 가능',
      '짧은 시간 안에 핵심적인 기술과 이론을 습득',
      '직장 내 건강 관리와 개인적인 건강 유지에 도움',
    ],
    mobileFeatures: [
      '실생활 즉시 활용 가능한 기초 지식',
      '셀프 피로 해소 및 건강 관리법',
      '누구나 부담 없이 참여 가능',
      '핵심 기술과 이론을 단시간 습득',
      '직장인 건강 관리에 최적',
    ],
    featureIcons: ['Lightbulb', 'Heart', 'Users', 'Clock', 'Briefcase'] as const,
  },
  {
    title: '정규 테라피 클래스',
    subtitle: 'Level 1~5 체계적 커리큘럼',
    desc: '초보자뿐만 아니라 테라피 테크닉을 적용하고자 하는 전문가들을 위한 프로그램입니다. 해부학적 이해와 과학적 근거를 기반으로 한 실전 중심 교육을 제공합니다.',
    mobileDesc: '초보자부터 전문가까지, 해부학 기반 실전 중심 교육 프로그램입니다.',
    image: '/images/class/event_academy_01.jpg',
    features: [
      '15년 이상 현장 경험 보유 대표 강사 직접 교육',
      '해부학 이론 기반의 체계적 커리큘럼',
      'Level 1~5 단계별 심화 과정',
      '소규모 정원제 실습 중심 수업',
      '수료 후 현장 실전 투입 가능한 수준',
    ],
    mobileFeatures: [
      '15년 경력 대표 강사 직접 교육',
      '해부학 기반 체계적 커리큘럼',
      '5단계 심화 과정',
      '소규모 정원제 실습 중심',
      '수료 후 현장 투입 가능',
    ],
    featureIcons: ['Award', 'BookOpen', 'TrendingUp', 'UserCheck', 'Target'] as const,
    showLevelRoadmap: true,
  },
];

export interface ClassLevel {
  level: string;
  title: string;
  titleEn: string;
  duration: string;
  desc: string;
  open: boolean;
}

export const CLASS_LEVELS: ClassLevel[] = [
  {
    level: 'Lv.1',
    title: '기초 건식 테라피 입문',
    titleEn: 'Introduction to Basic Dry Therapy',
    duration: '5주 15강',
    desc: '해부학 기초, 기본 스트로크, 전신 건식 테라피 루틴 습득',
    open: true,
  },
  {
    level: 'Lv.2',
    title: '심화 테크닉',
    titleEn: 'Advanced Technique',
    duration: '5주 15강',
    desc: '근막 이완, 트리거 포인트, 부위별 집중 테크닉',
    open: true,
  },
  {
    level: 'Lv.3',
    title: '스포츠 테라피',
    titleEn: 'Sports Therapy',
    duration: '5주 15강',
    desc: '운동 전후 관리\n퍼포먼스 향상 테크닉',
    open: false,
  },
  {
    level: 'Lv.4',
    title: '교정/재활 테라피',
    titleEn: 'Corrective & Rehabilitation',
    duration: '5주 15강',
    desc: '자세 교정, 통증 관리\n재활 보조 테크닉',
    open: false,
  },
  {
    level: 'Lv.5',
    title: '마스터 클래스',
    titleEn: 'Master Class',
    duration: '5주 15강',
    desc: '종합 실전, 케이스 스터디\n현장 투입 준비',
    open: false,
  },
];

export interface ClassReview {
  name: string;
  age: number;
  className: string;
  rating: number;
  text: string;
}

export const REVIEWS: ClassReview[] = [
  {
    name: '최우*',
    age: 45,
    className: '원데이 특강',
    rating: 5,
    text: '팀 워크샵으로 신청했습니다. 처음엔 다들 어색해하더니 직접 해보니 분위기가 풀리더군요. 이후로도 사무실에서 서로 어깨 해달라며 활용하고 있습니다. 다음 분기에도 신청할 계획입니다.',
  },
  {
    name: '김서*',
    age: 32,
    className: '정규 Lv1 클래스',
    rating: 4.8,
    text: '마사지 아예 몰랐는데 근육 이름부터 하나씩 짚어주시니까 바로 이해됨.. 유튜브 독학이랑 차원이 다르고요. 수업 끝나고 엄마한테 해줬더니 어디서 배웠냐고 놀라셨어요.',
  },
  {
    name: '박지*',
    age: 38,
    className: '원데이 특강',
    rating: 4.5,
    text: '남편이랑 같이 들었어요. 원래 이런 거 관심 없는 사람인데 의외로 재밌었다고 하더라고요. 아이 재우고 서로 해주는 게 우리 부부 힐링 루틴이 됐네요. 부부끼리 같이 들으시면 정말 좋을 것 같아요.',
  },
  {
    name: '이준*',
    age: 29,
    className: '정규 Lv1 클래스',
    rating: 4.9,
    text: 'PT 트레이너인데 고객 운동 후 근육 풀어줄 때 뭔가 부족하다 느꼈거든요. Lv1 듣고 나서 터치가 확 달라졌고 고객 반응이 바로 옴. 수강료 본전은 이미 뽑은 듯.',
  },
  {
    name: '정하*',
    age: 41,
    className: '원데이 특강',
    rating: 4.7,
    text: '운동 후에 늘 뻐근했는데 셀프로 푸는 방법을 배우고 나서 회복이 훨씬 빨라졌습니다. 특히 종아리와 전완근 푸는 법이 실용적이었어요. 운동하시는 분들께 추천드립니다.',
  },
  {
    name: '송미*',
    age: 35,
    className: '정규 Lv1 클래스',
    rating: 5,
    text: '피부관리실 10년차인데 제대로 배운 적은 없었어요. 선배한테 어깨너머로 배운 거라서.. 해부학부터 다시 잡으니까 동작 하나하나 이유가 이해되고, 손님께 설명도 자신있게 하게 됐습니다.',
  },
  {
    name: '한도*',
    age: 27,
    className: '원데이 특강',
    rating: 4.3,
    text: '회사 복지로 선생님이 사무실 와서 해주셨는데 동료들 반응 진짜 좋았음. 한 시간인데 핵심만 알려줘서 바로 옆자리한테 써먹음. 시간이 좀만 더 길었으면 하는 아쉬움.',
  },
  {
    name: '윤채*',
    age: 33,
    className: '정규 Lv1 클래스',
    rating: 4.6,
    text: '전직 준비로 등록했는데 4명 소규모라 모르는 거 바로 물어볼 수 있어서 좋았어요. 큰 학원이었으면 이렇게 못 배웠을 거예요. 선생님이 손 잡아서 교정해주시는 게 제일 컸습니다.',
  },
  {
    name: '오승*',
    age: 48,
    className: '정규 Lv2 클래스',
    rating: 5,
    text: 'Lv1을 마치고 Lv2로 넘어왔는데 확실히 난이도가 다릅니다. 트리거 포인트와 근막이완을 배우니 전문가가 되어가는 느낌이었습니다. 집사람에게 해줬더니 돈 받고 해도 되겠다더군요.',
  },
  {
    name: '강예*',
    age: 31,
    className: '정규 Lv2 클래스',
    rating: 4.8,
    text: '웰니스센터 근무중인데 Lv2 끝나고 바로 현장에서 써먹었어요. 어깨쪽 심화 테크닉이 고객 만족도를 많이 올려줬고 원장님도 관심 보이셨습니다. Lv3 오픈되면 바로 등록할 생각.',
  },
];
