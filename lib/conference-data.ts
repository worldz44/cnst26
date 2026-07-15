// All conference content below is extracted from the CNST'26 Call for Papers.
// Fields marked "to be announced" / placeholders were not present in the source
// document — update them here (or via the environment variables noted in the
// README) as soon as the organizing committee confirms them.

export const conference = {
  shortName: "CNST'26",
  fullName: "1st National Multidisciplinary Online Conference",
  edition: "CNST'26",
  date: "24 November 2026",
  dateISO: "2026-11-24",
  mode: "Fully Online — Official Virtual Platform",
  institution: "Faculty of Science & Technology, University of Khemis Miliana (Djilali Bounaama University of Khemis Miliana), Algeria",
  chair: "Dr. Kaci Meziane",
  description:
    "CNST'26 brings together researchers, academics, engineers and graduate students from diverse scientific and technical fields to share original research, innovative ideas and practical experience — a multidisciplinary platform for collaboration, knowledge exchange and applied-research advancement across engineering and science.",
  objectives: [
    "Provide a multidisciplinary platform for collaboration and knowledge exchange across engineering and science.",
    "Showcase original research, innovative ideas and practical experience from researchers, academics, engineers and graduate students.",
    "Advance applied research through peer-reviewed dissemination and open scientific discussion.",
    "Connect the national scientific community through an accessible, fully online format.",
  ],
  highlights: [
    "Fully online conference — interactive thematic sessions, oral presentations & virtual poster exhibitions",
    "Submit an extended abstract (1–2 pages) or a full paper (4–6 pages), in English or French",
    "All papers peer-reviewed by the Scientific Committee for originality, scientific quality & relevance",
    "Official certificate of participation awarded to all registered presenters",
    "Organized by the Faculty of Science & Technology, Khemis-Miliana University",
  ],
};

export type Track = {
  code: string;
  short: string;
  title: string;
  description: string;
  color: "cyan" | "amber" | "rose" | "violet" | "lime" | "steel";
};

export const tracks: Track[] = [
  {
    code: "01",
    short: "Power",
    title: "Power & Machines",
    description: "High-voltage systems, electrical machines, protection & control.",
    color: "amber",
  },
  {
    code: "02",
    short: "Energy",
    title: "Smart Grids & Renewables",
    description: "Renewable integration, energy storage, distributed resources.",
    color: "lime",
  },
  {
    code: "03",
    short: "Robotics",
    title: "Robotics & Automation",
    description: "Mechatronics, computer vision, embedded intelligent sensors.",
    color: "steel",
  },
  {
    code: "04",
    short: "AI & Vision",
    title: "AI, Vision & Signal Processing",
    description: "Neural networks, generative models, biomedical signals, forensics.",
    color: "violet",
  },
  {
    code: "05",
    short: "Civil Eng.",
    title: "Civil Engineering & Materials",
    description: "Construction materials, structural & seismic design, geotechnics.",
    color: "rose",
  },
  {
    code: "06",
    short: "Process Eng.",
    title: "Process Eng. & Sustainability",
    description: "Industrial processes, environmental & green technologies.",
    color: "cyan",
  },
];

export const importantDates = [
  { label: "Paper submission deadline", value: "To be announced" },
  { label: "Notification of acceptance", value: "To be announced" },
  { label: "Camera-ready submission", value: "To be announced" },
  { label: "Conference dates", value: "24 November 2026" },
];

export const honoraryPresidents = [
  { name: "Prof. BERRABAH Mohamed El Chik", role: "Rector, University of Khemis Miliana" },
  { name: "Dr. BENZAID Djelloul", role: "Dean, Faculty of Science & Technology" },
];

export const conferenceChairmen = [
  { name: "Dr. KACI Meziane", role: "University of Khemis Miliana" },
  { name: "Dr. ROUABAH Slim", role: "University of Khemis Miliana" },
];

export const scientificCommittee = {
  chairmen: [
    { name: "Dr. MERABTI Salem", role: "University of Khemis Miliana" },
    { name: "Pr. YOUSFI Abdelkader", role: "University of Khemis Miliana" },
  ],
  homeInstitutionLabel: "Djilali Bounaama University of Khemis Miliana",
  homeMembers: [
    "Prof. Bot Youcef", "Mr. AZIZOU Fethi", "Dr. MAHDAB Salim",
    "Dr. FEKIR Mohamed", "Dr. ABOU SOUFIANE Benyoucef", "Dr. IKNI Samir",
    "Dr. HAMZAOUI Ihssen", "Dr. KARAMOSTAPHA KHELIL Cherifa", "Dr. KERRACI Abdelkader",
    "Dr. BENALLAL Mohamed Nadjib", "Dr. KIFFOUCHE Abdeslam", "Dr. LAYATE Zakaria",
    "Mr. DOUCHA Missoum", "Dr. ABDELKADER Rabah", "Dr. HIMOUR Yassine",
    "Dr. BENTCHIKOU Ibrahim", "Dr. BENYAMINA Smain", "Dr. BAOUCHE Fatima Zohra",
    "Dr. BERKANE Samir", "Dr. MEZIDI Amar", "Dr. BOUDINA Abedallah",
    "Dr. TAHI Hamid", "Dr. HADJ SADOUK Ahmed", "Dr. CHEHAD Azeddine",
    "Dr. KOUIDER DJELLOUL Omar", "Prof. HACHAMA Kamel", "Dr. DOUICI Mohamed",
    "Dr. FERMOUS Rachid", "Dr. REZALA Houria", "Prof. KHADRAOUI Abdelkader",
    "Dr. BENYOUCEF Mekhaneg", "Dr. RAHMANI Fathia", "Dr. BOUDERGUA Samia",
    "Dr. ZOUANTI Mustapha", "Dr. SLIMANE Fatma Zohra", "Dr. MESLI Chahrazad",
    "Dr. AOUAMEUR Djamila", "Dr. SID ALI Lamia", "Dr. KHELIF Khadidja",
    "Dr. TAOUS Hamad", "Mme. ALICHE Zahia", "Dr. AIT HAMOUDA Camelia",
    "Dr. FAROUN Brahim", "Dr. Meziani Brahim", "Prof. AMROUCHE Zoheir",
    "Prof. TOUHAMI Taheni", "Dr. BELAIFI Sid Ali", "Dr. KHEBIZI Wiam",
    "Prof. ALI BEN YAHIA Khoudja", "Dr. BOUDJEMA Fatiha", "Dr. AYADI Souad",
    "Dr. BOUDECHICHE Noreddine",
  ],
  otherInstitutions: [
    { institution: "Chlef", members: ["Dr. FAYÇAL Mehdi"] },
    { institution: "Blida", members: ["Dr. KHELIFI OTHMAN khelifa"] },
    { institution: "Tiaret", members: ["Dr. NEGADI Karim"] },
    { institution: "Bejaia University", members: ["Prof. BENDAHMANE Boukhalfa"] },
    { institution: "Setif University", members: ["Prof. NOURI Hamou"] },
    {
      institution: "Relizane University",
      members: [
        "Dr. AIT SAID Hakim", "Pr. YSSAAD Benyssaad", "Pr. RAHLI Mostefa",
        "Pr. MELIANI Bouziane", "Dr. AISSOU Massinissa", "Dr. MOSTEFA TOUNSI Mahmoud",
        "Dr. LANTRI Tayeb", "Dr. BELABBAS Adda", "Dr. BELALIA Karim",
        "Dr. NAMOUNE Abdelhadi", "Dr. MANKOR Mohamed", "Dr. MOSTEFA Abdelkader",
      ],
    },
    { institution: "Tissemsilt University", members: ["Dr. NAAR Djilali"] },
    { institution: "BBA University", members: ["Dr. GUELMINE Layachi"] },
    { institution: "USTHB", members: ["Dr. MEBREK Rima"] },
    { institution: "UDES", members: ["Dr. BOUTRA Belkacem"] },
    { institution: "Bouira University", members: ["Dr. HAMDACHE Abderrazaq"] },
    { institution: "Médéa University", members: ["Dr. EZZIANE Hassane"] },
    {
      institution: "Blida 1 University",
      members: ["Dr. YKHLEF Farid", "Dr. AMROUCHE Badia", "Prof. AISSAT Abdelkader", "Dr. OUADAH Lamia"],
    },
    { institution: "ISTA Blida", members: ["Dr. Terki Lydia", "Dr. KHELOUIA Lamia", "Dr. BOUKHARI Nabil"] },
    { institution: "ENSA Alger", members: ["Dr. AISSAOUI Ourida"] },
    { institution: "M'sila University", members: ["Prof. AOUN Omar"] },
    { institution: "Université Djilali Liabès, Sidi Bel Abbès", members: ["Dr. BELGACEM Moussa"] },
    { institution: "École Nationale Polytechnique d'Alger, El Harrach", members: ["Dr. GHELEM Noureddine"] },
    { institution: "Université Ain Témouchent", members: ["Dr. AISSOU Massinissa"] },
  ],
};

export const organizingCommittee = {
  chairmen: [
    { name: "Dr. ROUABAH Slim", role: "University of Khemis Miliana" },
    { name: "Dr. BOUDECHICHE Noreddine", role: "University of Khemis Miliana" },
  ],
  homeInstitutionLabel: "Djilali Bounaama University of Khemis Miliana",
  homeMembers: [
    "Dr. IKNI Samir", "Dr. ABADNI Mohammed", "Dr. BENALLAL Mohamed Nadjib",
    "Dr. KERRACI Abdelkader", "Dr. KIFFOUCHE Abdeslam", "Mr. AZIZOU Fethi",
    "Dr. ALLICHE Ridha", "Dr. AIT HAMADOUCHE Mohamed", "Dr. TOUHARI Mahfoud",
    "Dr. CHADOULI Rachid", "Dr. NAAS Youcef", "Mr. ADDAD Djelloul",
    "Mme. ALICHE Zahia", "Mme. HADJ KHELIFA Leila", "Dr. HACHOUNE Zoubir",
    "Dr. ZOUANTI Mustapha",
  ],
  otherInstitutions: [
    { institution: "Médéa University", members: ["Dr. EZZIANE Hassane", "Mr. AIT HAMOUDA Tahar"] },
    { institution: "ISTA Blida", members: ["Dr. TERKI Lydia", "Dr. KHELOUIA Lamia", "Dr. BOUKHARI Nabil"] },
  ],
};

export const submission = {
  formats: [
    "Extended abstract (1–2 pages)",
    "Full paper (4–6 pages)",
  ],
  languages: ["English", "French"],
  review: "All papers are peer-reviewed by the Scientific Committee for originality, scientific quality and relevance.",
  templateNote:
    "No official manuscript template or submission portal was specified in the Call for Papers. Submit your manuscript as a single PDF file; the organizing committee will share a formatting template if one is issued.",
  outcome: "A certificate of participation is issued to all registered presenters.",
};

// Contact details were not published in the Call for Papers.
// Set these through environment variables so the site can be updated
// without a code change once the committee confirms them.
export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@cnst26.example.org",
  note: "Official contact address to be confirmed by the organizing committee.",
};
