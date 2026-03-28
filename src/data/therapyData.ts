/* Therapy page static data — 원본: AURUM_SITE_CONTENT.md */

export const THERAPY_FEATURES = [
  {
    icon: 'user-check',
    title: '전문가 대표',
    desc: '피부 미용과 근육·체형 교정에 대한 깊은 이해를 바탕으로 얼굴과 바디를 동시에 관리하는 통합 프로그램을 제공합니다.',
  },
  {
    icon: 'activity',
    title: '근골격 전문 케어',
    desc: '근육과 근막의 연결, 신경 긴장, 움직임 패턴까지 고려하여 단순 피로 완화를 넘어 기능과 움직임의 회복을 돕습니다.',
  },
  {
    icon: 'award',
    title: '딸고(THALGO) 인증',
    desc: '글로벌 스파 브랜드 Thalgo의 인증을 받은 정통 트리트먼트를 제공하는 인천 유일 전문점입니다.',
  },
  {
    icon: 'zap',
    title: '최첨단 기기',
    desc: '하이푸, 고주파, LDM, 피부분석기, 두피 관리기 등 최신 장비로 더욱 완성도 높은 관리를 제공합니다.',
  },
];

export interface Program {
  nameKo: string;
  nameEn: string;
  desc: string;
  method?: string;
  image: string;
}

export interface ProgramCategory {
  key: string;
  labelEn: string;
  labelKo: string;
  intro: string;
  programs: Program[];
}

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    key: 'body',
    labelEn: 'Body',
    labelKo: '피지컬 케어',
    intro: '해부학에 기반한 전문 테라피,\n피부와 근육을 동시에 케어.\n\n단순 뷰티 관리를 넘어서\n체형 교정까지 아우르는\n통합 피지컬 케어 프로그램.',
    programs: [
      {
        nameKo: '건식 스포츠 테라피',
        nameEn: 'Dry Sports Therapy',
        desc: '근육 뭉침과 통증을 완화하는 해부학 기반의 강력한 근육 이완 관리.',
        method: '옷을 입은 상태에서 근육을 집중적으로 풀어주는 드라이 마사지 테크닉이 적용',
        image: '/images/therapy/sub010201_1.jpg',
      },
      {
        nameKo: '아로마 스웨디시 테라피',
        nameEn: 'Aroma Swedish Massage',
        desc: '천연 아로마 오일을 이용한 부드러운 전신 이완 케어로 스트레스 해소와 숙면 유도.',
        method: '따뜻한 아로마 오일을 사용해 근육을 부드럽게 풀어주며 전신 릴랙스를 유도',
        image: '/images/therapy/sub010201_2.jpg',
      },
      {
        nameKo: '부분 집중 케어',
        nameEn: 'Dry Targeted Care',
        desc: '목, 어깨, 허리, 팔·다리 등 특정 통증 부위를 집중적으로 풀어주는 맞춤형 관리.',
        method: '고객의 상태에 따라 필요한 부위를 집중적으로 케어하며, 운동요법을 적용해 자세 교정과 통증 완화에 중점',
        image: '/images/therapy/sub010201_3.jpg',
      },
      {
        nameKo: '딸고 시그니처 바디 케어',
        nameEn: 'Thalgo Signature Body Care',
        desc: '프랑스 프리미엄 해양 테라피 브랜드 딸고(THALGO) 인증 관리로, 인천 유일 딸고 인증점에서 제공하는 전세계 동일한 시그니처 바디 트리트먼트.',
        image: '/images/therapy/sub010201_5.jpg',
      },
      {
        nameKo: '스톤 테라피',
        nameEn: 'Stone Massage Therapy',
        desc: '따뜻한 스톤의 열감을 이용해 혈액순환을 촉진하고 깊은 근육 이완을 돕는 케어.',
        method: '따뜻한 오일과 스톤을 사용해 근육 깊숙이 온열 효과를 전달하며, 피로가 집중된 부위를 부드럽게 마사지',
        image: '/images/therapy/sub010201_4.jpg',
      },
    ],
  },
  {
    key: 'face',
    labelEn: 'Face',
    labelKo: '페이셜 케어',
    intro: '딸고 인증 정통 트리트먼트와\n하이푸·고주파·LDM 등\n최첨단 장비를 결합한\n프리미엄 페이셜 프로그램.',
    programs: [
      {
        nameKo: '딸고 시그니처 트리트먼트',
        nameEn: 'Thalgo Signature Facial',
        desc: '프랑스 프리미엄 해양 테라피 브랜드 딸고(THALGO)의 인증 관리로, 인천 유일 딸고 인증점에서 제공하는 정통 페이셜 케어.',
        image: '/images/therapy/sub010202_1.jpg',
      },
      {
        nameKo: '경락 윤곽 관리',
        nameEn: 'Meridian Contouring',
        desc: '얼굴 부기 완화와 윤곽 라인 개선을 돕는 맞춤형 리프팅 마사지.',
        image: '/images/therapy/sub010202_2.jpg',
      },
      {
        nameKo: '첨단 기기 케어',
        nameEn: 'Advanced Device Care',
        desc: '하이푸, 고주파, LDM 초음파 등 최신 장비를 활용해 피부 탄력·재생·윤곽 개선을 돕는 전문 프로그램.',
        image: '/images/therapy/sub010202_3.jpg',
      },
    ],
  },
  {
    key: 'special',
    labelEn: 'Special',
    labelKo: '스페셜 프로그램',
    intro: '웨딩·산전산후·디톡스·슬리밍\n특별한 목적에 맞춘\n맞춤형 집중 케어 프로그램.',
    programs: [
      {
        nameKo: '웨딩 케어',
        nameEn: 'Wedding Care',
        desc: '부드러운 테라피와 디톡스를 통해 몸의 균형을 찾아주는 슬리밍 프로그램으로, 라인을 아름답게 다듬어드립니다.',
        image: '/images/therapy/sub010203_1.jpg',
      },
      {
        nameKo: '산전·산후 케어',
        nameEn: 'Prenatal & Postnatal Care',
        desc: '임신 전후 신체 변화로 인한 불편함을 완화하고 균형 회복을 돕는 맞춤 프로그램.',
        image: '/images/therapy/sub010203_2.jpg',
      },
      {
        nameKo: '디톡스 팩 케어',
        nameEn: 'Detox Pack Care',
        desc: '노폐물 배출과 피부 활력 회복을 위한 바디·페이스 디톡스 집중 관리.',
        image: '/images/therapy/sub010203_3.jpg',
      },
      {
        nameKo: '슬리밍',
        nameEn: 'Slimming Program',
        desc: '바디라인 조정과 셀룰라이트 개선을 위한 집중 관리 프로그램.',
        image: '/images/therapy/sub010203_4.jpg',
      },
    ],
  },
];

/* Legacy export for backwards compat — maps to new structure */
export const PROGRAMS: Record<string, Program[]> = Object.fromEntries(
  PROGRAM_CATEGORIES.map((cat) => [cat.labelEn, cat.programs])
);

export const FACILITY_IMAGES = {
  staff: '/images/therapy/space_thalgo_products.png',
  store: [
    '/images/therapy/space_couple_room.png',
    '/images/therapy/space_treatment_room.png',
    '/images/therapy/space_aroma_oils.png',
    '/images/therapy/space_therapist.png',
    '/images/therapy/space_logo.png',
    '/images/therapy/space_washroom.png',
  ],
};

export const REPRESENTATIVE = {
  name: '김순재',
  role: '아우름 웰니스 대표 테라피스트',
  quote:
    '단순히 근육을 푸는 마사지가 아니라, 몸의 구조를 이해하고 설계하는 웰니스 뷰티 테라피입니다.',
  image: '/images/therapy/staff_ceo.jpg',
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

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  quote?: string;
}

export const TEAM_CEO: TeamMember = {
  name: '김순재',
  role: '대표 테라피스트',
  image: '/images/therapy/staff_ceo.jpg',
  quote:
    '단순히 근육을 푸는 마사지가 아니라, 몸의 구조를 이해하고 설계하는 웰니스 뷰티 테라피입니다.',
};

export const TEAM_THERAPISTS: TeamMember[] = [
  { name: '김하정', role: '테라피스트', image: '/images/therapy/staff_hajung.jpg' },
  { name: '이지연', role: '테라피스트', image: '/images/therapy/staff_jiyeon.jpg' },
  { name: '김준경', role: '테라피스트', image: '/images/therapy/staff_junkyung.jpg' },
  { name: '전나영', role: '테라피스트', image: '/images/therapy/staff_nayoung.jpg' },
];

export const TEAM_GROUP_PHOTO = '/images/therapy/staff_group.jpg';

export const FAQ_DATA = [
  {
    q: '예약은 어떻게 하나요?',
    a: '네이버 예약, 네이버 톡톡, 전화, 카카오톡 채널을 통해 예약하실 수 있습니다. 당일 예약은 전화 문의 시 가능 여부를 확인해드립니다. 네이버에서 \'아우르메 테라피\'를 검색해 주세요!',
  },
  {
    q: '운영 시간과 휴무일은 언제인가요?',
    a: '평일과 주말 모두 운영하며, 비정기적인 휴무일은 네이버 플레이스의 공지사항을 통해 안내드립니다.',
  },
  {
    q: '커플이나 동반 관리는 가능한가요?',
    a: '2인 이상 동시 예약이 가능하며, 커플룸 이용도 가능합니다. 예약 시 미리 말씀해 주세요.',
  },
  {
    q: '주차는 가능한가요?',
    a: '매장 전용 주차장은 없으나, 아래 제휴 주차장을 이용하실 수 있습니다.\n\n1. SR노빌리안 (1호선 부평역 옆 건물)\n   주소: 인천 부평구 광장로 28\n   도보 약 10분 · 3시간 기본 무료\n\n2. 모다아울렛 부평점 및 앞 공용주차구역\n   주소: 인천 부평구 부평문화로 35\n   도보 약 5분 · 케어 시간 비례 주차비 지원\n\n3. 일요일 공용주차구역\n   모다아울렛 앞 공용주차구역\n   일요일 하루 종일 무료 이용 가능',
  },
  {
    q: '지역화폐나 제로페이로 결제 가능한가요?',
    a: '네, 모두 가능합니다. 아래 결제 수단을 지원하고 있습니다.\n\n· 지역화폐 (카드형)\n· 지역화폐 (모바일형)\n· 제로페이\n· 간편결제',
  },
];

