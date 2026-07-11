// ======================= Types =======================
export type Benefit = { emoji: string; label: string };

export type Job = {
  id: string;
  kind: "job";
  // --- Ebene 1: die Stelle (Vorderseite) ---
  jobType: string; // "Praktikum" | "Werkstudent" | "Ausbildung"
  title: string;
  employmentType: string; // z.B. "Pflichtpraktikum · 6 Mon."
  seniority: string; // Voraussetzung, z.B. "Bachelor-Studium"
  payRange: string;
  location: string;
  remote: string; // "Remote" | "Hybrid" | "Vor Ort"
  startDate: string;
  matchScore: number;
  topSkills: string[];
  // --- Ebene 2: der Arbeitgeber (Rückseite) ---
  company: string;
  logo: string;
  logoColor: string;
  industry: string;
  verified: boolean;
  rating: number;
  ratingCount: number;
  size: string;
  founded: string;
  companyPitch: string;
  cultureTags: string[];
  techStack: string[];
  benefits: Benefit[];
  // --- Media ---
  accent: string;
  emoji: string;
  videoUrl?: string;
};

export type Candidate = {
  id: string;
  kind: "candidate";
  name: string;
  age: number;
  headline: string; // gesuchte Rolle
  seniority: string;
  location: string;
  remote: string;
  availability: string;
  payWish: string;
  matchScore: number;
  verified: boolean;
  topSkills: string[];
  skills: string[];
  languages: string[];
  bio: string;
  highlights: { role: string; org: string; span: string }[];
  education: { degree: string; school: string; span: string }[];
  certificates: string[];
  cultureTags: string[];
  accent: string;
  emoji: string;
  videoUrl?: string;
};

export type Card = Job | Candidate;

// ======================= Dummy: Stellen (Bewerber-Modus) =======================
export const JOBS: Job[] = [
  {
    id: "j1", kind: "job", jobType: "Praktikum",
    title: "Praktikum Produktdesign", employmentType: "Pflichtpraktikum · 6 Mon.", seniority: "Bachelor-Studium",
    payRange: "1.400 €/Monat", location: "Berlin", remote: "Hybrid", startDate: "ab Sept.",
    matchScore: 94, topSkills: ["Figma-Basics", "Neugier", "Teamgeist"],
    company: "Lumen Studio", logo: "LU", logoColor: "#7c5cff", industry: "Design-Agentur",
    verified: true, rating: 4.6, ratingCount: 128, size: "45 Mitarbeitende", founded: "2016",
    companyPitch: "Bei uns ist Praktikum kein Kaffeekochen: Du arbeitest ab Tag 1 an echten Kundenprojekten mit – mit fester Mentorin an deiner Seite.",
    cultureTags: ["1:1-Mentoring", "Übernahmechance", "Duz-Kultur", "Hunde erlaubt"],
    techStack: ["Figma", "FigJam", "Framer", "Storybook"],
    benefits: [
      { emoji: "🎓", label: "Feste Mentor:in" }, { emoji: "🏠", label: "Hybrid möglich" },
      { emoji: "🎟️", label: "Deutschlandticket" }, { emoji: "🤝", label: "Übernahmechance" },
    ],
    accent: "#7c5cff", emoji: "🎨",
    videoUrl: "https://videos.pexels.com/video-files/9849533/9849533-sd_506_960_25fps.mp4",
  },
  {
    id: "j2", kind: "job", jobType: "Werkstudent",
    title: "Werkstudent:in Frontend", employmentType: "Werkstudent · 20 Std./Wo.", seniority: "Info-Studium",
    payRange: "17 €/Std.", location: "Hamburg", remote: "Hybrid", startDate: "ab sofort",
    matchScore: 88, topSkills: ["React-Basics", "HTML/CSS", "Lernbereit"],
    company: "Nordwind Energy", logo: "NW", logoColor: "#1ec98b", industry: "CleanTech",
    verified: true, rating: 4.4, ratingCount: 76, size: "120 Mitarbeitende", founded: "2019",
    companyPitch: "Sammle echte Praxis neben dem Studium: Dein Code läuft in der Software hinter Deutschlands Solarparks. Uni-freundliche Zeiten garantiert.",
    cultureTags: ["Uni-freundliche Zeiten", "Impact", "Deutsch & Englisch"],
    techStack: ["React", "TypeScript", "GraphQL", "Node", "AWS"],
    benefits: [
      { emoji: "🕒", label: "Flexible Uni-Zeiten" }, { emoji: "🌱", label: "Impact-Job" },
      { emoji: "🎟️", label: "Deutschlandticket" }, { emoji: "💻", label: "Eigenes Notebook" },
    ],
    accent: "#1ec98b", emoji: "⚡",
    videoUrl: "https://videos.pexels.com/video-files/6248593/6248593-sd_640_360_25fps.mp4",
  },
  {
    id: "j3", kind: "job", jobType: "Ausbildung",
    title: "Ausbildung Bäcker:in", employmentType: "Ausbildung · 3 Jahre", seniority: "Schulabschluss",
    payRange: "1.000–1.200 €/Monat", location: "München", remote: "Vor Ort", startDate: "ab Aug.",
    matchScore: 81, topSkills: ["Frühaufsteher:in", "Sorgfalt", "Teamgeist"],
    company: "Bäckerei Krüger", logo: "BK", logoColor: "#e6a23c", industry: "Handwerk & Food",
    verified: false, rating: 4.2, ratingCount: 41, size: "8 Filialen", founded: "1974",
    companyPitch: "Familienbäckerei in dritter Generation. Wir bilden aus mit Herz, echtem Handwerk – und Übernahmegarantie bei bestandener Prüfung.",
    cultureTags: ["Übernahmegarantie", "Familiär", "Meister:in im Team"],
    techStack: ["Backstube", "Kassensystem"],
    benefits: [
      { emoji: "🥐", label: "Freies Frühstück" }, { emoji: "🏅", label: "Übernahmegarantie" },
      { emoji: "💶", label: "Azubi-Bonus" }, { emoji: "🚗", label: "Fahrtkostenzuschuss" },
    ],
    accent: "#e6a23c", emoji: "🥐",
    videoUrl: "https://videos.pexels.com/video-files/5930359/5930359-sd_360_640_30fps.mp4",
  },
  {
    id: "j4", kind: "job", jobType: "Praktikum",
    title: "Praktikum Machine Learning", employmentType: "Praktikum · 3–6 Mon.", seniority: "Master-Studium",
    payRange: "1.800 €/Monat", location: "Remote (DE)", remote: "Remote", startDate: "ab sofort",
    matchScore: 91, topSkills: ["Python", "ML-Grundlagen", "Motiviert"],
    company: "Mint Robotics", logo: "MR", logoColor: "#19c3ff", industry: "Robotics",
    verified: true, rating: 4.7, ratingCount: 53, size: "60 Mitarbeitende", founded: "2020",
    companyPitch: "Bring unseren Lager-Robotern das Sehen bei – im Praktikum mit echtem Ownership, Code-Reviews vom Team und Aussicht auf eine Werkstudentenstelle.",
    cultureTags: ["Echtes Ownership", "Werkstudi-Option", "Async-first"],
    techStack: ["Python", "PyTorch", "ROS", "Docker"],
    benefits: [
      { emoji: "🌍", label: "Remote in DE" }, { emoji: "💻", label: "Top-Hardware" },
      { emoji: "🎓", label: "Code-Reviews & Mentoring" }, { emoji: "📈", label: "Werkstudi-Option" },
    ],
    accent: "#19c3ff", emoji: "🤖",
    videoUrl: "https://videos.pexels.com/video-files/8084621/8084621-sd_640_360_25fps.mp4",
  },
  {
    id: "j5", kind: "job", jobType: "Werkstudent",
    title: "Werkstudent:in Social Media", employmentType: "Werkstudent · 20 Std./Wo.", seniority: "Studium (egal was)",
    payRange: "16 €/Std.", location: "Köln", remote: "Hybrid", startDate: "ab sofort",
    matchScore: 85, topSkills: ["TikTok", "Kreativität", "Trends"],
    company: "Klar & Co", logo: "K&", logoColor: "#ff6b9d", industry: "Marketing",
    verified: true, rating: 4.3, ratingCount: 64, size: "30 Mitarbeitende", founded: "2018",
    companyPitch: "Du bekommst eigene Accounts, kreative Freiheit und ein Team, das Trends lebt – der perfekte Praxis-Boost neben dem Studium.",
    cultureTags: ["Eigene Accounts", "Junges Team", "Uni-freundlich"],
    techStack: ["Later", "CapCut", "Canva", "Notion"],
    benefits: [
      { emoji: "📱", label: "Neustes iPhone" }, { emoji: "🎉", label: "Team-Events" },
      { emoji: "☕", label: "Barista im Office" }, { emoji: "🕒", label: "Flexible Uni-Zeiten" },
    ],
    accent: "#ff6b9d", emoji: "📱",
    videoUrl: "https://videos.pexels.com/video-files/8357561/8357561-sd_506_960_25fps.mp4",
  },
  {
    id: "j6", kind: "job", jobType: "Ausbildung",
    title: "Ausbildung Pflegefachkraft", employmentType: "Ausbildung · 3 Jahre", seniority: "Mittlere Reife",
    payRange: "1.200–1.350 €/Monat", location: "Bremen", remote: "Vor Ort", startDate: "ab Sept.",
    matchScore: 79, topSkills: ["Empathie", "Teamwork", "Zuverlässig"],
    company: "Hafenklinik", logo: "HK", logoColor: "#5cc8ff", industry: "Gesundheit",
    verified: true, rating: 4.1, ratingCount: 210, size: "900 Mitarbeitende", founded: "1987",
    companyPitch: "Starte deine Pflege-Karriere bei uns: verlässliche Ausbildungspläne, feste Praxisanleiter:innen und Übernahme in Festanstellung.",
    cultureTags: ["Feste Praxisanleitung", "Übernahmegarantie", "Krisensicher"],
    techStack: ["Digitale Patientenakte"],
    benefits: [
      { emoji: "🎓", label: "Feste Praxisanleitung" }, { emoji: "🏅", label: "Übernahmegarantie" },
      { emoji: "💶", label: "Azubi-Zulagen" }, { emoji: "🏠", label: "Wohnheim-Option" },
    ],
    accent: "#5cc8ff", emoji: "💙",
    videoUrl: "https://videos.pexels.com/video-files/6130561/6130561-sd_360_640_30fps.mp4",
  },
];

// ======================= Dummy: Kandidat:innen (Recruiter-Modus) =======================
export const CANDIDATES: Candidate[] = [
  {
    id: "c1", kind: "candidate",
    name: "Alex", age: 22, headline: "Werkstudent:in Frontend", seniority: "Info-Student, 4. Semester",
    location: "Leipzig", remote: "Remote / Hybrid", availability: "ab sofort · 20 Std./Wo.", payWish: "16 €/Std.",
    matchScore: 92, verified: true,
    topSkills: ["React", "HTML/CSS", "Lernbereit"],
    skills: ["HTML/CSS", "JavaScript", "React", "Git", "Figma-Basics"],
    languages: ["Deutsch (Muttersprache)", "Englisch (fließend)"],
    bio: "Neben dem Studium schon zwei eigene Web-Projekte gebaut. Ich suche echte Praxis in einem Team, das mir was beibringt.",
    highlights: [
      { role: "Werkstudent Web", org: "lokale Agentur", span: "2024–heute" },
      { role: "Tutor Programmieren", org: "Uni Leipzig", span: "2023–2024" },
    ],
    education: [
      { degree: "B.Sc. Informatik (laufend)", school: "Uni Leipzig", span: "seit 2022" },
    ],
    certificates: ["freeCodeCamp: Responsive Web", "Meta Front-End (Coursera)"],
    cultureTags: ["Lernkultur", "Remote-ok", "Produktnah"], accent: "#7c5cff", emoji: "🧑‍💻",
    videoUrl: "https://videos.pexels.com/video-files/6248593/6248593-sd_640_360_25fps.mp4",
  },
  {
    id: "c2", kind: "candidate",
    name: "Mira", age: 24, headline: "Praktikum Produktdesign", seniority: "Design-Studium (Master)",
    location: "Berlin", remote: "Hybrid", availability: "Pflichtpraktikum ab Sept.", payWish: "1.400 €/Monat",
    matchScore: 89, verified: true,
    topSkills: ["Figma", "UX-Basics", "Motiviert"],
    skills: ["Figma", "UX Research Basics", "Prototyping", "Illustrator"],
    languages: ["Deutsch", "Englisch", "Spanisch (Grundlagen)"],
    bio: "Ich will raus aus der Uni-Bubble und an echten Produkten lernen. Meine Mappe mit Studien-Projekten ist bereit.",
    highlights: [
      { role: "Design-Werkstudentin", org: "Startup (Berlin)", span: "2024–heute" },
      { role: "Tutorin Gestaltung", org: "UdK Berlin", span: "2023" },
    ],
    education: [
      { degree: "M.A. Interaction Design (laufend)", school: "UdK Berlin", span: "seit 2023" },
      { degree: "B.A. Kommunikationsdesign", school: "FH Potsdam", span: "2019–2023" },
    ],
    certificates: ["Google UX Design (Coursera)", "Figma Advanced"],
    cultureTags: ["Lernhungrig", "Design-driven", "Teamplayer"], accent: "#ff6b9d", emoji: "👩‍🎨",
    videoUrl: "https://videos.pexels.com/video-files/4972699/4972699-sd_640_360_30fps.mp4",
  },
  {
    id: "c3", kind: "candidate",
    name: "Jonas", age: 18, headline: "Ausbildung Bäcker:in", seniority: "Realschulabschluss 2025",
    location: "München", remote: "Vor Ort", availability: "ab Aug.", payWish: "Ausbildungsvergütung",
    matchScore: 84, verified: false,
    topSkills: ["Frühaufsteher", "Handwerk", "Zuverlässig"],
    skills: ["Kundenservice", "Sorgfalt", "Teamarbeit", "Frühschicht"],
    languages: ["Deutsch", "Englisch (Schulniveau)"],
    bio: "Nach der Schule will ich ein echtes Handwerk lernen. Ich packe gern früh an und arbeite gern im Team.",
    highlights: [
      { role: "Schülerpraktikum Bäckerei", org: "Bäckerei Müller", span: "2024" },
      { role: "Aushilfe Café", org: "Café Sonne", span: "2023–2024" },
    ],
    education: [
      { degree: "Mittlere Reife", school: "Realschule München", span: "2016–2025" },
    ],
    certificates: ["Erste-Hilfe-Kurs", "Hygieneschulung (geplant)"],
    cultureTags: ["Handwerk", "Früh dabei", "Teamgeist"], accent: "#e6a23c", emoji: "🧑‍🍳",
    videoUrl: "https://videos.pexels.com/video-files/3246669/3246669-sd_640_360_25fps.mp4",
  },
  {
    id: "c4", kind: "candidate",
    name: "Yara", age: 23, headline: "Praktikum Machine Learning", seniority: "Master Informatik",
    location: "Remote (Portugal)", remote: "Remote", availability: "ab sofort · 3–6 Mon.", payWish: "1.800 €/Monat",
    matchScore: 90, verified: true,
    topSkills: ["Python", "ML-Basics", "Neugierig"],
    skills: ["Python", "NumPy", "PyTorch (Basics)", "Git"],
    languages: ["Englisch", "Portugiesisch", "Deutsch (A2)"],
    bio: "Im Master mit Fokus ML. Ich will Modelle endlich in echte Produkte bringen statt nur in Uni-Aufgaben.",
    highlights: [
      { role: "Studentische Hilfskraft ML-Lab", org: "Univ. Lissabon", span: "2024–heute" },
      { role: "Hackathon-Gewinnerin", org: "JunctionX", span: "2023" },
    ],
    education: [
      { degree: "M.Sc. Machine Learning (laufend)", school: "Univ. Lissabon", span: "seit 2023" },
      { degree: "B.Sc. Informatik", school: "Univ. Lissabon", span: "2019–2023" },
    ],
    certificates: ["DeepLearning.AI Specialization", "Kaggle: Intro to ML"],
    cultureTags: ["Async-ok", "Deep Tech", "Ownership"], accent: "#19c3ff", emoji: "👩‍🔬",
    videoUrl: "https://videos.pexels.com/video-files/8084624/8084624-sd_640_360_25fps.mp4",
  },
  {
    id: "c5", kind: "candidate",
    name: "Deniz", age: 21, headline: "Werkstudent:in Social Media", seniority: "Medien-Studium",
    location: "Köln", remote: "Hybrid", availability: "ab sofort · 20 Std./Wo.", payWish: "16 €/Std.",
    matchScore: 86, verified: true,
    topSkills: ["TikTok", "Video-Editing", "Trends"],
    skills: ["TikTok", "CapCut", "Instagram", "Storytelling"],
    languages: ["Deutsch", "Türkisch", "Englisch"],
    bio: "Ich lebe auf TikTok und habe nebenbei einen Account auf 30k gebracht. Suche Praxis neben dem Studium.",
    highlights: [
      { role: "Werkstudent Social", org: "kleines Label", span: "2024–heute" },
      { role: "Content Creator", org: "eigener Kanal", span: "2022–heute" },
    ],
    education: [
      { degree: "B.A. Medienmanagement (laufend)", school: "HMKW Köln", span: "seit 2022" },
    ],
    certificates: ["Meta Blueprint Basics", "Google Analytics 4"],
    cultureTags: ["Trend-first", "Kreativ", "Schnell"], accent: "#ff9f43", emoji: "🎬",
    videoUrl: "https://videos.pexels.com/video-files/7677193/7677193-sd_360_640_25fps.mp4",
  },
  {
    id: "c6", kind: "candidate",
    name: "Sophie", age: 19, headline: "Ausbildung Pflegefachkraft", seniority: "Fachabitur 2025",
    location: "Bremen", remote: "Vor Ort", availability: "ab Sept.", payWish: "Ausbildungsvergütung",
    matchScore: 83, verified: true,
    topSkills: ["Empathie", "Teamwork", "Belastbar"],
    skills: ["Empathie", "Zuverlässigkeit", "Kommunikation", "Erste Hilfe"],
    languages: ["Deutsch", "Englisch (Grundlagen)"],
    bio: "Ich möchte Menschen helfen und einen krisensicheren Beruf lernen. Im Praktikum auf Station habe ich gemerkt: das ist meins.",
    highlights: [
      { role: "FSJ Pflege", org: "Seniorenheim Bremen", span: "2024–2025" },
      { role: "Schülerpraktikum Klinik", org: "Klinikum Bremen", span: "2023" },
    ],
    education: [
      { degree: "Fachabitur Gesundheit", school: "BBS Bremen", span: "2022–2025" },
    ],
    certificates: ["Erste-Hilfe-Kurs", "Pflegebasiskurs (FSJ)"],
    cultureTags: ["Empathisch", "Zuverlässig", "Teamplayer"], accent: "#5cc8ff", emoji: "👩‍⚕️",
    videoUrl: "https://videos.pexels.com/video-files/6130120/6130120-sd_640_360_30fps.mp4",
  },
];

// ======================= Leitfragen für die Vorstellungsvideos =======================
// Jedes Kartenvideo ist ein asynchrones Vorstellungsvideo, das diese Fragen beantwortet.
export const CANDIDATE_QUESTIONS = [
  "Stell dich in 30 Sekunden vor.",
  "Warum reizt dich dieser Bereich?",
  "Was möchtest du in der Stelle lernen?",
];

export const JOB_QUESTIONS = [
  "Wer seid ihr in einem Satz?",
  "Wie sieht der Alltag als Praktikant:in / Azubi bei euch aus?",
  "Was lernst du bei uns – und wie geht's danach weiter?",
];

export const questionsFor = (c: Card) =>
  c.kind === "job" ? JOB_QUESTIONS : CANDIDATE_QUESTIONS;

// ======================= Matches (mit Sample-Daten) =======================
export type MatchEntry = { card: Card; when: string; preview: string; unread: boolean };

export const SAMPLE_MATCHES: MatchEntry[] = [
  { card: JOBS[1], when: "vor 2 Std.", unread: true,
    preview: "Nordwind Energy: Super Match! Wir freuen uns riesig auf deine Bewerbung 🌱" },
  { card: JOBS[3], when: "gestern", unread: true,
    preview: "Mint Robotics: Cooles Uni-Projekt! Magst du uns mehr dazu zeigen?" },
  { card: JOBS[4], when: "vor 3 Tagen", unread: false,
    preview: "Du: Danke fürs Match! Ich freue mich riesig über euer Team 🎉" },
];

// ======================= Dein eigenes Profil ("Du") =======================
export const ME: Candidate = {
  id: "me", kind: "candidate",
  name: "Du", age: 23, headline: "Praktikum / Werkstudent Produktdesign", seniority: "Design-Studium, 5. Semester",
  location: "Berlin", remote: "Remote / Hybrid", availability: "ab sofort · 20 Std./Wo.", payWish: "16 €/Std. bzw. 1.400 €/Mon.",
  matchScore: 87, verified: true,
  topSkills: ["Figma", "UI-Design", "Motiviert"],
  skills: ["Figma", "UI-Design", "Prototyping", "UX-Basics", "Framer", "HTML/CSS"],
  languages: ["Deutsch (Muttersprache)", "Englisch (fließend)", "Französisch (Grundlagen)"],
  bio: "Design-Student mit Lust auf echte Produkte. Ich habe schon zwei Uni-Projekte bis zum klickbaren Prototyp gebracht und suche jetzt Praxis in einem Team.",
  highlights: [
    { role: "Design-Werkstudent", org: "Startup (Berlin)", span: "2024–heute" },
    { role: "Freelance UI (klein)", org: "diverse", span: "2023–2024" },
    { role: "Tutor Gestaltungsgrundlagen", org: "UdK Berlin", span: "2023" },
  ],
  education: [
    { degree: "B.A. Interaction Design (laufend)", school: "UdK Berlin", span: "seit 2022" },
    { degree: "Abitur", school: "Gymnasium Berlin", span: "2014–2022" },
  ],
  certificates: ["Google UX Design (Coursera)", "Figma Advanced", "Accessibility Basics"],
  cultureTags: ["Lernhungrig", "Remote-ok", "Design-driven"],
  accent: "#7c5cff", emoji: "🙋",
};
