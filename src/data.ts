// ======================= Types =======================
export type Benefit = { emoji: string; label: string };

export type Job = {
  id: string;
  kind: "job";
  // --- Ebene 1: der Job (Vorderseite) ---
  title: string;
  employmentType: string; // Vollzeit / Teilzeit ...
  seniority: string;
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

// ======================= Dummy: Jobs (Bewerber-Modus) =======================
export const JOBS: Job[] = [
  {
    id: "j1", kind: "job",
    title: "Senior Product Designer", employmentType: "Vollzeit", seniority: "Senior",
    payRange: "€68–82k", location: "Berlin", remote: "Remote", startDate: "ab sofort",
    matchScore: 94, topSkills: ["Figma", "Design Systems", "Prototyping"],
    company: "Lumen Studio", logo: "LU", logoColor: "#7c5cff", industry: "Design-Agentur",
    verified: true, rating: 4.6, ratingCount: 128, size: "45 Mitarbeitende", founded: "2016",
    companyPitch: "Wir gestalten digitale Produkte für Klima-Startups. Kleine Teams, große Wirkung – und ein Design-Team, das gehört wird.",
    cultureTags: ["Duz-Kultur", "4-Tage-Woche", "Remote-first", "Hunde erlaubt"],
    techStack: ["Figma", "FigJam", "Framer", "Storybook"],
    benefits: [
      { emoji: "🏠", label: "100% Remote" }, { emoji: "🏖️", label: "30 Tage Urlaub" },
      { emoji: "📚", label: "1.500€ Lernbudget" }, { emoji: "🚴", label: "Jobrad" },
    ],
    accent: "#7c5cff", emoji: "🎨",
    videoUrl: "https://videos.pexels.com/video-files/9849533/9849533-sd_506_960_25fps.mp4",
  },
  {
    id: "j2", kind: "job",
    title: "Frontend Engineer", employmentType: "Vollzeit", seniority: "Mid–Senior",
    payRange: "€62–78k", location: "Hamburg", remote: "Hybrid", startDate: "ab Sept.",
    matchScore: 88, topSkills: ["React", "TypeScript", "GraphQL"],
    company: "Nordwind Energy", logo: "NW", logoColor: "#1ec98b", industry: "CleanTech",
    verified: true, rating: 4.4, ratingCount: 76, size: "120 Mitarbeitende", founded: "2019",
    companyPitch: "Wir bauen die Software hinter Deutschlands Solarparks. Dein Code sorgt dafür, dass grüner Strom dahin fließt, wo er gebraucht wird.",
    cultureTags: ["Impact", "Flexible Zeiten", "Deutzsch & Englisch"],
    techStack: ["React", "TypeScript", "GraphQL", "Node", "AWS"],
    benefits: [
      { emoji: "🏡", label: "3 Tage Homeoffice" }, { emoji: "🌱", label: "Impact-Job" },
      { emoji: "🎟️", label: "Deutschlandticket" }, { emoji: "💪", label: "Urban Sports" },
    ],
    accent: "#1ec98b", emoji: "⚡",
    videoUrl: "https://videos.pexels.com/video-files/6248593/6248593-sd_640_360_25fps.mp4",
  },
  {
    id: "j3", kind: "job",
    title: "Filialleitung", employmentType: "Vollzeit", seniority: "Mit Führung",
    payRange: "€44–52k", location: "München", remote: "Vor Ort", startDate: "ab Okt.",
    matchScore: 81, topSkills: ["Führung", "Warenkunde", "Service"],
    company: "Bäckerei Krüger", logo: "BK", logoColor: "#e6a23c", industry: "Handwerk & Food",
    verified: false, rating: 4.2, ratingCount: 41, size: "8 Filialen", founded: "1974",
    companyPitch: "Familienbäckerei in dritter Generation. Wir suchen jemanden, der ein Team von 12 Leuten mit Herz und Übersicht führt.",
    cultureTags: ["Familiär", "Sicherer Job", "Frühschicht"],
    techStack: ["Kassensystem", "Dienstplan-App"],
    benefits: [
      { emoji: "🥐", label: "Freies Frühstück" }, { emoji: "🚗", label: "Parkplatz" },
      { emoji: "💶", label: "13. Gehalt" }, { emoji: "🏅", label: "Unbefristet" },
    ],
    accent: "#e6a23c", emoji: "🥐",
    videoUrl: "https://videos.pexels.com/video-files/5930359/5930359-sd_360_640_30fps.mp4",
  },
  {
    id: "j4", kind: "job",
    title: "Machine Learning Engineer", employmentType: "Vollzeit", seniority: "Senior",
    payRange: "€85–105k", location: "Remote (EU)", remote: "Remote", startDate: "ab sofort",
    matchScore: 91, topSkills: ["Python", "PyTorch", "Computer Vision"],
    company: "Mint Robotics", logo: "MR", logoColor: "#19c3ff", industry: "Robotics",
    verified: true, rating: 4.7, ratingCount: 53, size: "60 Mitarbeitende", founded: "2020",
    companyPitch: "Unsere Roboter kommissionieren Lager in ganz Europa. Du bringst ihnen bei, die Welt zu sehen.",
    cultureTags: ["Deep Tech", "Async-first", "Sabbatical möglich"],
    techStack: ["Python", "PyTorch", "ROS", "Docker", "Kubernetes"],
    benefits: [
      { emoji: "🌍", label: "Remote in EU" }, { emoji: "💻", label: "Top-Hardware" },
      { emoji: "📈", label: "Stock Options" }, { emoji: "✈️", label: "2× Teamweek/Jahr" },
    ],
    accent: "#19c3ff", emoji: "🤖",
    videoUrl: "https://videos.pexels.com/video-files/8084621/8084621-sd_640_360_25fps.mp4",
  },
  {
    id: "j5", kind: "job",
    title: "Social Media Manager", employmentType: "Teilzeit möglich", seniority: "Junior–Mid",
    payRange: "€42–54k", location: "Köln", remote: "Hybrid", startDate: "ab sofort",
    matchScore: 85, topSkills: ["Instagram", "TikTok", "Content"],
    company: "Klar & Co", logo: "K&", logoColor: "#ff6b9d", industry: "Marketing",
    verified: true, rating: 4.3, ratingCount: 64, size: "30 Mitarbeitende", founded: "2018",
    companyPitch: "Wir machen Marken laut. Bei uns bekommst du eigene Accounts, kreative Freiheit und ein Team, das Trends lebt.",
    cultureTags: ["Kreativ", "Junges Team", "Team-Events"],
    techStack: ["Later", "CapCut", "Canva", "Notion"],
    benefits: [
      { emoji: "📱", label: "Neustes iPhone" }, { emoji: "🎉", label: "Team-Events" },
      { emoji: "☕", label: "Barista im Office" }, { emoji: "🧘", label: "Mental-Health-Days" },
    ],
    accent: "#ff6b9d", emoji: "📱",
    videoUrl: "https://videos.pexels.com/video-files/8357561/8357561-sd_506_960_25fps.mp4",
  },
  {
    id: "j6", kind: "job",
    title: "Pflegefachkraft", employmentType: "Voll- oder Teilzeit", seniority: "Alle Level",
    payRange: "€3.900–4.600/Monat", location: "Bremen", remote: "Vor Ort", startDate: "ab sofort",
    matchScore: 79, topSkills: ["Pflege", "Empathie", "Teamwork"],
    company: "Hafenklinik", logo: "HK", logoColor: "#5cc8ff", industry: "Gesundheit",
    verified: true, rating: 4.1, ratingCount: 210, size: "900 Mitarbeitende", founded: "1987",
    companyPitch: "Wir verzichten auf Schichten-Chaos: verlässliche Dienstpläne, echte Wertschätzung und ein Haus, das zusammenhält.",
    cultureTags: ["Verlässlicher Dienstplan", "Fortbildung", "Krisensicher"],
    techStack: ["Digitale Patientenakte"],
    benefits: [
      { emoji: "🕒", label: "Wunsch-Dienstplan" }, { emoji: "💶", label: "Zulagen" },
      { emoji: "🏫", label: "Bezahlte Fortbildung" }, { emoji: "🏠", label: "Umzugshilfe" },
    ],
    accent: "#5cc8ff", emoji: "💙",
    videoUrl: "https://videos.pexels.com/video-files/6130561/6130561-sd_360_640_30fps.mp4",
  },
];

// ======================= Dummy: Kandidat:innen (Recruiter-Modus) =======================
export const CANDIDATES: Candidate[] = [
  {
    id: "c1", kind: "candidate",
    name: "Alex", age: 29, headline: "Senior Frontend Engineer", seniority: "5 Jahre Erfahrung",
    location: "Leipzig", remote: "Remote bevorzugt", availability: "verfügbar in 4 Wochen", payWish: "€72k",
    matchScore: 92, verified: true,
    topSkills: ["React", "TypeScript", "Next.js"],
    skills: ["React", "TypeScript", "Next.js", "Testing", "Design Systems", "Node"],
    languages: ["Deutsch (Muttersprache)", "Englisch (fließend)"],
    bio: "Ex-Agentur, jetzt auf der Suche nach einem Produkt, das ich langfristig mitprägen kann. Ich liebe saubere Component-APIs.",
    highlights: [
      { role: "Senior Frontend", org: "Delivery Hero", span: "2021–heute" },
      { role: "Frontend Dev", org: "Freelance", span: "2019–2021" },
    ],
    education: [
      { degree: "B.Sc. Medieninformatik", school: "HTWK Leipzig", span: "2015–2018" },
    ],
    certificates: ["AWS Certified Developer", "Professional Scrum Master I"],
    cultureTags: ["Remote-first", "Async", "Produktnah"], accent: "#7c5cff", emoji: "🧑‍💻",
    videoUrl: "https://videos.pexels.com/video-files/6248593/6248593-sd_640_360_25fps.mp4",
  },
  {
    id: "c2", kind: "candidate",
    name: "Mira", age: 34, headline: "Product Designer", seniority: "8 Jahre Erfahrung",
    location: "Berlin", remote: "Hybrid", availability: "sofort verfügbar", payWish: "€75k",
    matchScore: 89, verified: true,
    topSkills: ["Figma", "UX Research", "Design Systems"],
    skills: ["Figma", "UX Research", "Design Systems", "Prototyping", "Workshops"],
    languages: ["Deutsch", "Englisch", "Spanisch (Grundlagen)"],
    bio: "Ich bringe Ordnung ins Chaos: von der User-Interview-Wand bis zum fertigen Token-System. Suche ein Team mit echtem Design-Reifegrad.",
    highlights: [
      { role: "Lead Designer", org: "N26", span: "2020–heute" },
      { role: "Product Designer", org: "Zalando", span: "2016–2020" },
    ],
    education: [
      { degree: "M.A. Interaction Design", school: "HfG Schwäbisch Gmünd", span: "2012–2015" },
      { degree: "B.A. Kommunikationsdesign", school: "FH Potsdam", span: "2009–2012" },
    ],
    certificates: ["NN/g UX Certification", "Design Sprint Master"],
    cultureTags: ["Design-driven", "Mentoring", "4-Tage-Woche"], accent: "#ff6b9d", emoji: "👩‍🎨",
    videoUrl: "https://videos.pexels.com/video-files/4972699/4972699-sd_640_360_30fps.mp4",
  },
  {
    id: "c3", kind: "candidate",
    name: "Jonas", age: 41, headline: "Filialleiter Einzelhandel", seniority: "15 Jahre Erfahrung",
    location: "München", remote: "Vor Ort", availability: "verfügbar in 8 Wochen", payWish: "€50k",
    matchScore: 84, verified: false,
    topSkills: ["Führung", "Personalplanung", "Warenwirtschaft"],
    skills: ["Führung", "Personalplanung", "Warenwirtschaft", "Coaching", "Kundenservice"],
    languages: ["Deutsch", "Englisch (gut)"],
    bio: "Ich führe Teams, die gerne zur Arbeit kommen. Niedrige Fluktuation ist meine wichtigste Kennzahl.",
    highlights: [
      { role: "Filialleiter", org: "dm-drogerie markt", span: "2014–heute" },
      { role: "Stv. Leitung", org: "REWE", span: "2008–2014" },
    ],
    education: [
      { degree: "Handelsfachwirt (IHK)", school: "IHK München", span: "2010–2012" },
      { degree: "Ausbildung Einzelhandelskaufmann", school: "REWE Group", span: "2003–2006" },
    ],
    certificates: ["Ausbildereignung (AdA)", "Erste-Hilfe-Ausbilder"],
    cultureTags: ["Bodenständig", "Teamplayer", "Regional"], accent: "#e6a23c", emoji: "🧑‍💼",
    videoUrl: "https://videos.pexels.com/video-files/3246669/3246669-sd_640_360_25fps.mp4",
  },
  {
    id: "c4", kind: "candidate",
    name: "Yara", age: 26, headline: "ML Engineer", seniority: "3 Jahre Erfahrung",
    location: "Remote (Portugal)", remote: "Remote", availability: "sofort verfügbar", payWish: "€78k",
    matchScore: 90, verified: true,
    topSkills: ["Python", "PyTorch", "MLOps"],
    skills: ["Python", "PyTorch", "MLOps", "Computer Vision", "Docker"],
    languages: ["Englisch", "Portugiesisch", "Deutsch (A2)"],
    bio: "PhD-Abbrecherin, weil ich lieber Modelle in Produktion sehe als in Papern. Fokus: Vision-Systeme, die wirklich laufen.",
    highlights: [
      { role: "ML Engineer", org: "Unbabel", span: "2022–heute" },
      { role: "Research Intern", org: "TU München", span: "2021" },
    ],
    education: [
      { degree: "M.Sc. Machine Learning (abgebrochen)", school: "TU München", span: "2020–2021" },
      { degree: "B.Sc. Informatik", school: "Universidade de Lisboa", span: "2016–2020" },
    ],
    certificates: ["DeepLearning.AI Specialization", "TensorFlow Developer Cert."],
    cultureTags: ["Async-first", "Deep Tech", "Ownership"], accent: "#19c3ff", emoji: "👩‍🔬",
    videoUrl: "https://videos.pexels.com/video-files/8084624/8084624-sd_640_360_25fps.mp4",
  },
  {
    id: "c5", kind: "candidate",
    name: "Deniz", age: 31, headline: "Social Media & Content", seniority: "6 Jahre Erfahrung",
    location: "Köln", remote: "Hybrid", availability: "verfügbar in 2 Wochen", payWish: "€52k",
    matchScore: 86, verified: true,
    topSkills: ["TikTok", "Video-Editing", "Storytelling"],
    skills: ["TikTok", "Instagram", "Video-Editing", "Storytelling", "Community"],
    languages: ["Deutsch", "Türkisch", "Englisch"],
    bio: "Ich habe drei Accounts über 100k gebracht. Mir ist ein Team wichtig, das Trends nicht nur nachmacht, sondern setzt.",
    highlights: [
      { role: "Content Lead", org: "About You", span: "2021–heute" },
      { role: "Social Manager", org: "Freelance", span: "2018–2021" },
    ],
    education: [
      { degree: "B.A. Medien- & Eventmanagement", school: "HMKW Köln", span: "2012–2015" },
    ],
    certificates: ["Meta Certified Media Buying", "Google Analytics 4"],
    cultureTags: ["Kreativ", "Schnell", "Trend-first"], accent: "#ff9f43", emoji: "🎬",
    videoUrl: "https://videos.pexels.com/video-files/7677193/7677193-sd_360_640_25fps.mp4",
  },
  {
    id: "c6", kind: "candidate",
    name: "Sophie", age: 38, headline: "Pflegefachkraft", seniority: "12 Jahre Erfahrung",
    location: "Bremen", remote: "Vor Ort", availability: "verfügbar in 6 Wochen", payWish: "€4.300/Monat",
    matchScore: 83, verified: true,
    topSkills: ["Intensivpflege", "Anleitung", "Empathie"],
    skills: ["Intensivpflege", "Anleitung", "Dokumentation", "Notfallmanagement"],
    languages: ["Deutsch", "Englisch (Grundlagen)"],
    bio: "Ich brenne für gute Pflege – aber nur mit Dienstplänen, die auch ein Privatleben zulassen. Suche ein Haus, das das ernst meint.",
    highlights: [
      { role: "Fachkraft Intensiv", org: "Uniklinik Köln", span: "2016–heute" },
      { role: "Gesundheitspflegerin", org: "Charité", span: "2012–2016" },
    ],
    education: [
      { degree: "Fachweiterbildung Intensivpflege", school: "Uniklinik Köln", span: "2018–2020" },
      { degree: "Ausbildung Gesundheits- & Krankenpflege", school: "Charité Berlin", span: "2009–2012" },
    ],
    certificates: ["Fachkraft für Intensiv- & Anästhesiepflege", "Basale Stimulation"],
    cultureTags: ["Verlässlich", "Empathisch", "Team-Mensch"], accent: "#5cc8ff", emoji: "👩‍⚕️",
    videoUrl: "https://videos.pexels.com/video-files/6130120/6130120-sd_640_360_30fps.mp4",
  },
];

// ======================= Leitfragen für die Vorstellungsvideos =======================
// Jedes Kartenvideo ist ein asynchrones Vorstellungsvideo, das diese Fragen beantwortet.
export const CANDIDATE_QUESTIONS = [
  "Stell dich in 30 Sekunden vor.",
  "Was motiviert dich in deinem Job?",
  "Was suchst du in deinem nächsten Team?",
];

export const JOB_QUESTIONS = [
  "Wer seid ihr in einem Satz?",
  "Wie sieht ein typischer Tag bei euch aus?",
  "Warum arbeiten Leute gerne bei euch?",
];

export const questionsFor = (c: Card) =>
  c.kind === "job" ? JOB_QUESTIONS : CANDIDATE_QUESTIONS;
