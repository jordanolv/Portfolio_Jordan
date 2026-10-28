import northy1 from "@/assets/static/img/project1.png";
import plaisirs1 from "@/assets/static/img/project2.png";
import card1 from "@/assets/static/img/cardbattlebg.png";
import card2 from "@/assets/static/img/cardbattle2.png";
import card3 from "@/assets/static/img/cardbattle3.png";
import guess1 from "@/assets/static/img/guesscolor.png";
import quiz1 from "@/assets/static/img/quizbg.jpg";
import quiz2 from "@/assets/static/img/quizbg2.jpg";
import quiz3 from "@/assets/static/img/quizbg3.jpg";
import nook1 from "@/assets/static/img/projects/nookapp-1.webp";
import nook2 from "@/assets/static/img/projects/nookapp-2.webp";
import ridge1 from "@/assets/static/img/projects/the-ridge-1.webp";
import ridge2 from "@/assets/static/img/projects/the-ridge-2.webp";
import trip1 from "@/assets/static/img/projects/7trip-1.webp";
import trip2 from "@/assets/static/img/projects/7trip-2.webp";
import dylanHome from "@/assets/static/img/projects/dylanolivier-home.webp";
import dylanAnimaux from "@/assets/static/img/projects/dylanolivier-animaux.webp";
import dylanGalerie from "@/assets/static/img/projects/dylanolivier-galerie.webp";
import dylanBoutique from "@/assets/static/img/projects/dylanolivier-boutique.webp";
import dylanShooting from "@/assets/static/img/projects/dylanolivier-shooting.webp";

export interface Project {
  id: string;
  name: string;
  kind: string;
  summary: string;
  description: string;
  stack: string[];
  /** "featured" = grande carte, "list" = ligne sur l'accueil, "archive" = page Tous les projets */
  tier: "featured" | "list" | "archive";
  badge?: string;
  client?: string;
  year?: string;
  images?: string[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "nookapp",
    name: "NookApp",
    kind: "Bureau virtuel",
    summary: "Un bureau virtuel en pixel-art 2D, avec chat vocal de proximité.",
    description:
      "Chacun crée son « Nook », invite ses membres, dessine sa carte et retrouve son équipe dans un monde 2D en pixel-art, avec voix de proximité et édition collaborative en temps réel.",
    stack: ["NestJS", "Nuxt 3", "PostgreSQL", "Socket.IO", "Phaser", "LiveKit"],
    images: [nook1, nook2],
    tier: "featured",
    year: "2026",
    links: [{ label: "GitHub", href: "https://github.com/jordanolv/NookApp" }],
  },
  {
    id: "the-ridge",
    name: "The Ridge",
    kind: "Bot Discord",
    summary: "Un bot Discord modulaire, déployé en continu sur VPS.",
    description:
      "Bot Discord modulaire pour animer une communauté. Un environnement par branche, déployé automatiquement sur VPS via Dokploy.",
    stack: ["TypeScript", "discord.js", "MongoDB", "Express", "Docker"],
    images: [ridge1, ridge2],
    tier: "featured",
    year: "2025 — 2026",
    links: [{ label: "GitHub", href: "https://github.com/jordanolv/the-ridge" }],
  },
  {
    id: "7trip",
    name: "7Trip",
    kind: "Application mobile",
    summary: "Tout ton voyage, au même endroit.",
    description:
      "Application mobile pour préparer, organiser et suivre ses voyages, en solo ou en groupe. Les visuels sont issus des maquettes de la V1.",
    stack: ["React Native", "Expo", "NestJS", "Prisma"],
    images: [trip1, trip2],
    tier: "featured",
    badge: "Bientôt",
    year: "2026",
    links: [{ label: "GitHub", href: "https://github.com/jordanolv/7Trip" }],
  },
  {
    id: "dylanolivier",
    name: "dylanolivier.fr",
    kind: "Site vitrine & boutique",
    summary: "Portfolio et boutique en ligne, avec back-office.",
    description:
      "Site réalisé pour mon frère : portfolio, boutique en ligne et back-office pour gérer le contenu.",
    stack: ["TypeScript", "Node.js"],
    links: [{ label: "Voir le site", href: "https://dylanolivier.fr" }],
    images: [dylanHome, dylanAnimaux, dylanGalerie, dylanBoutique, dylanShooting],
    tier: "list",
    client: "Dylan Olivier",
    year: "2025 — 2026",
  },
  {
    id: "plaisirs-fondants",
    name: "Plaisirs Fondants",
    kind: "E-commerce",
    summary: "Boutique Shopify transformée en vitrine sur mesure.",
    description:
      "Transformation d'une boutique Shopify en boutique vitrine à la demande du client, avec un dashboard admin pour gérer l'entièreté du site (design du client).",
    stack: ["Node.js", "Express", "SCSS"],
    tier: "list",
    client: "Plaisirs Fondants",
    year: "2022",
    images: [plaisirs1],
    links: [{ label: "GitHub", href: "https://github.com/jordanolv/express-shop-vitrine" }],
  },
  {
    id: "northy",
    name: "Northy",
    kind: "Bot Discord",
    summary: "Bot Discord pour gérer des communautés.",
    description: "Bot Discord développé avec Discord.js pour gérer les communautés de Northway.",
    stack: ["Node.js", "Discord.js"],
    tier: "archive",
    client: "Northway",
    year: "2022",
    images: [northy1],
    links: [{ label: "GitHub", href: "https://github.com/jordanolv/Northy" }],
  },
  {
    id: "card-battle",
    name: "Card Battle Game",
    kind: "Jeu de cartes",
    summary: "Jeu de cartes avec système de classes.",
    description:
      "Jeu de cartes avec système de classes, réalisé pour un exercice de formation. Visuels générés avec Midjourney.",
    stack: ["HTML / SCSS", "JavaScript", "Midjourney"],
    tier: "archive",
    year: "2023",
    images: [card1, card2, card3],
    links: [{ label: "Jouer", href: "https://project.jordanolivier.dev/Card_Battle_Game/" }],
  },
  {
    id: "rock-paper-scissors",
    name: "Rock Paper Scissors",
    kind: "Jeu en ligne",
    summary: "Pierre-feuille-ciseaux en ligne.",
    description: "Jeu de pierre-feuille-ciseaux en ligne grâce à Socket.io.",
    stack: ["Node.js", "Socket.io", "Express"],
    tier: "archive",
    year: "2023",
    links: [{ label: "GitHub", href: "https://github.com/jordanolv/rock-paper-scissors-socket" }],
  },
  {
    id: "quiz",
    name: "Quiz",
    kind: "Quiz à thème",
    summary: "Quiz avec choix du thème et score.",
    description:
      "Quiz avec choix du thème et système de score ; tous les thèmes sont chargés depuis des fichiers JSON.",
    stack: ["HTML / SCSS", "JavaScript"],
    tier: "archive",
    year: "2022",
    images: [quiz1, quiz2, quiz3],
    links: [{ label: "Jouer", href: "https://project.jordanolivier.dev/QuizIFPA/" }],
  },
  {
    id: "guess-the-color",
    name: "Guess the Color",
    kind: "Jeu simple",
    summary: "Deviner la couleur d'un code RGB.",
    description: "Petit jeu où il faut deviner la couleur indiquée par un code RGB, avec score et vies.",
    stack: ["HTML / CSS", "JavaScript"],
    tier: "archive",
    year: "2022",
    images: [guess1],
    links: [{ label: "Jouer", href: "https://project.jordanolivier.dev/Guess_Color/" }],
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const listedProjects = projects.filter((p) => p.tier === "list");
export const archivedProjects = projects.filter((p) => p.tier === "archive");

export const findProject = (id: string) => projects.find((p) => p.id === id);
