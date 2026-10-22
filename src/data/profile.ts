export const profile = {
  firstName: "Jordan",
  lastName: "Olivier",
  role: "Développeur Full Stack",
  intro:
    "Diplômé d'un Mastère Expert en Développement Full Stack après 3 ans d'alternance chez Wisebuilding, je conçois et développe des applications web de bout en bout.",
  status: "Recherche un CDI · ouvert à d'autres opportunités",
  statusShort: "Recherche un CDI",
  location: "Beauvais · Paris & alentours · Remote",
  locationShort: "Beauvais · Paris · Remote",
  email: "jordanolv.pro@gmail.com",
  linkedin: "https://www.linkedin.com/in/jordanolv",
  github: "https://github.com/jordanolv",
  cv: "/cv.pdf",
  domain: "jordanolivier.dev",
};

export const stack = [
  "Vue",
  "Nuxt",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Symfony",
  "PHP",
  "PostgreSQL",
  "MongoDB",
  "Docker",
];

export interface Step {
  period: string;
  title: string;
  place?: string;
  text?: string;
}

export const parcours: Step[] = [
  {
    period: "2023 — 2026",
    title: "Analyste / Développeur Full Stack",
    place: "Wisebuilding · alternance",
    text: "Maintenance de l'application historique, participation à la nouvelle stack et évolution de Smartnance, une GMAO. Mastère Expert en Développement Full Stack validé.",
  },
  {
    period: "2022 — 2023",
    title: "Développeur Web / Web Mobile",
    place: "CCI de Lyon",
    text: "Formation diplômante.",
  },
  {
    period: "2022",
    title: "IFPA Formation",
    text: "Technique et découverte en informatique.",
  },
  {
    period: "Depuis 2020",
    title: "Autodidacte",
    text: "Premiers pas sur le Site du Zéro / OpenClassrooms, puis apprentissage par projets.",
  },
];
