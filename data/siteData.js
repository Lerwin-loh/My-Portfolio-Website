const achievements = [
  {
    id: 'firstAchieveBook',
    duration: 1000,
    coverClass: 'cover-img1',
    icon: '/img/ocbc_gold_medal.png',
    iconStyle: 'height:55px; width:auto; margin-bottom:30px;',
    description: 'For Outstanding Academic Performance in NYP.'
  },
  {
    duration: 1500,
    coverClass: 'cover-img2',
    icon: '/img/icons/top1.png',
    iconStyle: 'height:55px; width:auto; margin-bottom:30px;',
    descriptionHtml: 'Top 1,<br> Perfect 4.0 GPA, Diploma <br> in Business &amp; Financial Technology.'
  },
  {
    duration: 1000,
    coverClass: 'cover-img3',
    icon: '/img/scs.png',
    iconStyle: 'height:auto; width:100px; margin-bottom:50px;',
    descriptionHtml: 'For Outstanding <br> Final Year Project (FYP) <br> 2023.'
  },
  {
    duration: 1500,
    coverClass: 'cover-img4',
    icon: '/img/icons/10_percent.png',
    iconStyle: 'height:55px; width:auto; margin-bottom:30px;',
    descriptionHtml: 'For all 6 consecutive semesters &amp; attaining <br> 28 distinctions out of <br> 32 modules.'
  },
  {
    duration: 1000,
    coverClass: 'cover-img5',
    icon: '/img/icons/fintech.png',
    iconStyle: 'height:55px; width:auto; margin-bottom:30px;',
    description: 'Participated & represented NYP in pitching ideas and developing FinTech prototypes to address real world problems'
  },
  {
    duration: 1200,
    coverClass: 'cover-img6',
    icon: '/img/icons/Dplus.png',
    iconStyle: 'height:55px; width:auto; margin-bottom:30px;',
    description: "Took 3 diploma plus programmes, collectively earning 2 A's and 1 Distinction."
  },
  {
    duration: 1400,
    coverImage: '/img/book-covers/Brainhack Champion.png',
    icon: '/img/icons/top1.png',
    iconStyle: 'height:55px; width:auto; margin-bottom:30px;',
    description: 'Clinched 1st place at the DSTA BrainHack CODE_EXP Hackathon by building an AI-powered, gamified digital literacy ecosystem.'
  },
  {
    duration: 1600,
    coverImage: '/img/book-covers/CP2106 Artemis Certification.png',
    icon: '/img/icons/artemis.png',
    iconStyle: 'height:55px; width:auto; margin-bottom:30px;',
    description: 'Achieved the Artemis (Extreme) level for NUS CP2106 Orbital, a self-directed SWE project.'
  }
];

const homepageProjects = [
  {
    id: 'project_1',
    imageFirst: true,
    image: '/img/projects/proctor/proctor_lerwin.jpg',
    imageStyle: 'filter: brightness(95%);',
    label: 'INTERNSHIP',
    date: 'SEPT 2022 - FEB 2023',
    description: 'An intern at P&G as an Associate Researcher, aided with the creation of a text and object detection model.',
    href: '/aProject/project_1'
  },
  {
    id: 'project_2',
    imageFirst: false,
    image: '/img/projects/BIPJ/digipass_home.png',
    label: 'FY PROJECT',
    date: 'APR 2022 - AUG 2022',
    description: 'Tackling a Real-World Problem statement from PolyFinTech 100 API Hackathon 2022, my team and I came up with a cutting-edge solution for our final year project, which dives into blockchain implementations and AI Automation features.',
    href: '/aProject/project_2'
  },
  {
    id: 'project_3',
    imageFirst: true,
    image: '/img/projects/FSD/shoecraft_home_crop.png',
    imageStyle: 'filter: brightness(95%);',
    label: 'FULL STACK DEV',
    date: 'APR 2022 - AUG 2022',
    description: 'A full-stack application project aimed to create a responsive website, integrated with a virtual cloud database and e-commerce standard management systems.',
    href: '/aProject/project_3'
  },
  {
    id: 'project_4',
    imageFirst: false,
    image: '/img/projects/BADP/veloce_home_crop.png',
    label: 'C# APP DEV',
    date: 'NOV 2021 - FEB 2022',
    description: 'A dynamic, secured, SQL database-driven and interactive e-business BOT service website, catered to automate difficult e-purchases. In this instance, branded goods!',
    href: '/aProject/project_4'
  },
  {
    id: 'project_5',
    imageFirst: true,
    image: '/img/projects/PADP/candy_home_crop.png',
    imageStyle: 'filter: brightness(95%);',
    label: 'PY APP DEV',
    date: 'NOV 2020 - FEB 2021',
    description: 'This project is developed based on the python-flask framework and it aims to empower traditional brick and motor businesses with e-commerce.',
    href: '/aProject/project_5'
  },
  {
    id: 'project_6',
    imageFirst: false,
    image: '/img/projects/analytics/zhiqi_chart_crop.jpg',
    label: 'DATA ANALYTICS',
    date: 'APR 2021 - AUG 2021',
    description: 'Applied visualization concepts and business analytics & intelligence techniques with the use of Tableau Software, to support the hypothesis, "The ease of house ownership in Singapore is increasing".',
    href: '/aProject/project_6'
  }
];

const recognitionPreview = {
  testimonials: [
    '/img/recognitions/testimonials/mayflower_sec_p1.jpg',
    '/img/recognitions/testimonials/Poly_testimonial.jpeg'
  ],
  certificates: [
    '/img/recognitions/certificates/poly/poly_2023_academic.jpg',
    '/img/recognitions/certificates/poly/dList y3s2.jpg'
  ]
};

const testimonials = [
  { src: '/img/recognitions/testimonials/mayflower_sec_p1.jpg', alt: 'Mayflower testimonial page 1' },
  { src: '/img/recognitions/testimonials/mayflower_sec_p2.jpg', alt: 'Mayflower testimonial page 2' },
  { src: '/img/recognitions/testimonials/Poly_testimonial.jpeg', alt: 'Polytechnic testimonial' },
  { src: '/img/recognitions/testimonials/Nanobee_Recommendation_Letter.jpg', alt: 'Nanobee recommendation letter' },
  { src: '/img/recognitions/testimonials/saf_testimonial_1.jpg', alt: 'SAF testimonial page 1' },
  { src: '/img/recognitions/testimonials/saf_testimonial_2.jpg', alt: 'SAF testimonial page 2' }
];

const certificateGalleries = [
  {
    title: 'NYP Academic Transcript',
    items: [
      { src: '/img/recognitions/transcripts/NYP Official Transcript.jpg', alt: 'NYP official transcript' },
      { src: '/img/recognitions/transcripts/NYP Optional Elective Transcript.jpg', alt: 'NYP optional elective transcript' },
      { src: '/img/recognitions/transcripts/PFP Transcript.jpg', alt: 'PFP transcript' },
      { src: '/img/recognitions/certificates/poly/LearningPath_Certificate_RPA.jpg', alt: 'RPA learning path certificate', className: 'gallery-item2', style: 'width: 720px;' },
      { src: '/img/recognitions/certificates/poly/proctor_innovation_2023.jpg', alt: 'Proctor innovation certificate', className: 'gallery-item2', style: 'width: 720px;' }
    ]
  },
  {
    title: "Director's List Awards (6)",
    items: [
      { src: '/img/recognitions/certificates/poly/dList y1s1.jpg', alt: "Director's List Y1S1" },
      { src: '/img/recognitions/certificates/poly/dList y1s2.jpg', alt: "Director's List Y1S2" },
      { src: '/img/recognitions/certificates/poly/dList y2s1.jpg', alt: "Director's List Y2S1" },
      { src: '/img/recognitions/certificates/poly/dList y2s2.jpg', alt: "Director's List Y2S2" },
      { src: '/img/recognitions/certificates/poly/dList y3s1.jpg', alt: "Director's List Y3S1" },
      { src: '/img/recognitions/certificates/poly/dList y3s2.jpg', alt: "Director's List Y3S2" }
    ]
  },
  {
    title: 'N & O Level Certificates',
    items: [
      { src: '/img/recognitions/transcripts/Mayflower_Nlvl.png', alt: 'N level certificate', className: 'gallery-item2' },
      { src: '/img/recognitions/transcripts/Mayflower_Olvl.png', alt: 'O level certificate', className: 'gallery-item2', style: 'width: 720px;' }
    ]
  },
  {
    title: 'Bursary & Scholarship Awards',
    items: [
      { src: '/img/recognitions/certificates/poly/scs_award_2023.jpg', alt: 'SCS award 2023' },
      { src: '/img/recognitions/certificates/poly/ocbc_gold_award_2023.jpg', alt: 'OCBC gold award 2023' },
      { src: '/img/recognitions/certificates/poly/poly_2023_skills.jpg', alt: 'NYP skills award 2023' },
      { src: '/img/recognitions/certificates/poly/poly_2023_academic.jpg', alt: 'NYP academic award 2023' },
      { src: '/img/recognitions/certificates/secondary/mayflower_2020_merit.jpeg', alt: 'Mayflower merit award 2020' },
      { src: '/img/recognitions/certificates/secondary/mayflower_2018_scholar.jpeg', alt: 'Mayflower scholarship award 2018' },
      { src: '/img/recognitions/certificates/secondary/mayflower_2017_scholar.jpeg', alt: 'Mayflower scholarship award 2017' },
      { src: '/img/recognitions/certificates/secondary/mayflower_2016_merit.jpeg', alt: 'Mayflower merit award 2016' },
      { src: '/img/recognitions/certificates/secondary/mayflower_2016_academic.jpeg', alt: 'Mayflower academic award 2016' }
    ]
  },
  {
    title: 'SAF CERTIFICATES',
    items: [
      { src: '/img/recognitions/certificates/saf/saf_3sg_2024.jpg', alt: 'SAF 3SG certificate' },
      { src: '/img/recognitions/certificates/saf/saf_mp_2024.jpg', alt: 'SAF MP certificate' }
    ]
  },
  {
    title: 'CCA Records',
    items: [
      { src: '/img/recognitions/transcripts/cca_records_nyp.jpg', alt: 'NYP CCA records' },
      { src: '/img/recognitions/certificates/secondary/mayflower_2018_eagles.jpg', alt: 'Mayflower EAGLES award' },
      { src: '/img/recognitions/certificates/secondary/mayflower_npcc.jpeg', alt: 'Mayflower NPCC record', className: 'gallery-item2', style: 'width: 720px;' }
    ]
  }
];

module.exports = {
  achievements,
  homepageProjects,
  recognitionPreview,
  testimonials,
  certificateGalleries
};
