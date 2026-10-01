// lib/constants.ts
export const IDENTITY = {
  name: "Nizar Alfarizi Akbar",
  alias: "Fariz",
  role: "Software Engineer",
  location: "Sidoarjo, Indonesia",
  email: "me@fariz.dev",
  bio: "Backend dev building \"gabut\" projects and crushing work tasks.",
  description: "Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",
  motto: "Code with craft. Ship with purpose.",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/farizink" },
  { label: "Bluesky", href: "https://bsky.app/profile/fariz.dev" },
  { label: "Discord", href: "https://discord.com/users/383164336450830336" },
  { label: "Email", href: "mailto:me@fariz.dev" },
];

export const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const PROJECTS = [
  {
    title: "dea",
    displayTitle: "Dea",
    subtitle: "Your virtual secretary",
    tech: "TypeScript",
    href: "https://github.com/farizink/dea",
    year: "2024",
    imageUrl: "https://opengraph.githubassets.com/1/farizink/dea",
  },
  {
    title: "space",
    displayTitle: "Space",
    subtitle: "Personal experimental project",
    tech: "TypeScript",
    href: "https://github.com/farizink/space",
    year: "2024",
    imageUrl: "https://opengraph.githubassets.com/1/farizink/space",
  },
  {
    title: "avogado6",
    displayTitle: "Avogado6",
    subtitle: "Personal site — built with Svelte",
    tech: "Svelte",
    href: "https://github.com/farizink/avogado6",
    year: "2024",
    imageUrl: "https://opengraph.githubassets.com/1/farizink/avogado6",
  },
  {
    title: "gak-ngotak",
    displayTitle: "Gak Ngotak",
    subtitle: "Discord random auto-chat bot",
    tech: "JavaScript",
    href: "https://github.com/farizink/gak-ngotak",
    year: "2023",
    imageUrl: "https://opengraph.githubassets.com/1/farizink/gak-ngotak",
  },
];

// SERVICES removed — was only consumed by deleted Services.tsx component

export const SEQUENCE_FRAME_COUNT = 192;

// ── Hero Clock ──────────────────────────────────────────────
export const HERO_CLOCK = {
  siteTimezone: "WIB",
  localTimeLabel: "Your time",
} as const;

// ── Marquee (2 rows, alternating direction) ─────────────────
export const MARQUEE_ROWS = [
  [
    "FRONTEND DEVELOPER",
    "CREATIVE CODER",
    "TYPESCRIPT",
    "REACT",
    "NEXT.JS",
    "OPEN SOURCE",
    "SIDOARJO, ID",
  ],
  [
    "BACKEND DEVELOPER",
    "UI/UX ENTHUSIAST",
    "NODE.JS",
    "SVELTE",
    "THREE.JS",
    "FULL STACK",
    "INDONESIA 🇮🇩",
  ],
] as const;

// ── About Section ───────────────────────────────────────────
export const ABOUT_COPY = {
  heading: "About Me",
  body: "Hi, I'm Fariz — a software engineer based in Sidoarjo, Indonesia. I love crafting clean, performant web experiences and building developer tools that solve real problems. When I'm not shipping code, I'm exploring creative coding, 3D experiments, or contributing to open source.",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Svelte",
    "Tailwind CSS",
    "PostgreSQL",
    "Docker",
    "Git",
    "Figma",
  ],
} as const;

// ── Tech Logos ──────────────────────────────────────────────
export const TECH_LOGOS = [
  { name: "HTML", mark: "HTML", color: "#e34f26" },
  { name: "CSS", mark: "CSS", color: "#1572b6" },
  { name: "VS Code", mark: "VS", color: "#007acc" },
  { name: "TypeScript", mark: "TS", color: "#3178c6" },
  { name: "Python", mark: "PY", color: "#3776ab" },
  { name: "React", mark: "R", color: "#149eca" },
  { name: "Next.js", mark: "N", color: "#111111" },
  { name: "Tailwind CSS", mark: "TW", color: "#0e7490" },
  { name: "Node.js", mark: "JS", color: "#5fa04e" },
  { name: "Laravel", mark: "L", color: "#ff2d20" },
  { name: "Figma", mark: "F", color: "#f24e1e" },
  { name: "Bun", mark: "B", color: "#141414" },
] as const;

// ── Project Categories ──────────────────────────────────────
export const PROJECT_CATEGORIES = [
  "ALL",
  "WEB APP",
  "WEBSITE",
  "UI/UX",
  "GRAPHIC",
] as const;

// ── Quote ───────────────────────────────────────────────────
export const QUOTE = {
  text: "Code with craft. Ship with purpose.",
  author: "Fariz",
} as const;

// ── Contact CTA ─────────────────────────────────────────────
export const CONTACT_CTA = {
  heading: "Let's Make Something Great",
  subheading:
    "I'm always open to new opportunities, collaborations, and connections. Got a project to discuss or just want to say hi? Feel free to reach out!",
  email: "me@fariz.dev",
} as const;

// ── Footer ──────────────────────────────────────────────────
export const FOOTER = {
  tagline:
    "Crafting digital experiences with code and creativity, blending aesthetics with functionality for a seamless and impactful digital presence.",
  navItems: [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "mailto:me@fariz.dev" },
  ],
  copyright: `© ${new Date().getFullYear()} Nizar Alfarizi Akbar. All rights reserved.`,
} as const;
