export interface Project {
  name: string;
  award: string | null;
  description: string | null;
  tags: string[];
  github: string | null;
  live: string | null;
}

export const projects: Project[] = [
  {
    name: 'Plant',
    award: 'NUACM Hackathon — Education Track Winner',
    description:
      'AI-powered course planner with personalized recommendations and PDF transcript parsing. Architected a Python pipeline to scrape and manage 87,000+ university courses in Firestore. Built drag-and-drop scheduling with difficulty-balancing algorithms.',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Python'],
    github: 'https://github.com/rayyshen',
    live: null,
  },
  {
    name: 'EcoJustice',
    award: 'Hack the Nest — Grand Prize Winner',
    description:
      'Interactive analytics map visualizing EPA, CDC, and Census data. Mapped Social Vulnerability Index scores against industrial sites to identify environmental disparities by county. Automated data-driven advocacy letters for contacting local representatives.',
    tags: ['Next.js', 'Google Maps API', 'TypeScript'],
    github: 'https://github.com/rayyshen',
    live: null,
  },
  {
    name: 'NU SGA Site',
    award: null,
    description:
      "Full migration of Northeastern SGA's website from Squarespace to a custom React application. Serves 38,000+ students and faculty with a configurable drag-and-drop CMS backed by PostgreSQL.",
    tags: ['React', 'PostgreSQL', 'Node.js'],
    github: null,
    live: null,
  },
  {
    name: 'Prometheus',
    award: null,
    description:
      'Pro bono web tool for a nonprofit supporting survivors of domestic violence. Built a service-matching questionnaire deployed to 250+ survivors, with accessibility and survivor-conscious design at the forefront.',
    tags: ['React', 'TypeScript', 'Vercel'],
    github: null,
    live: null,
  },
  {
    name: 'Cider',
    award: 'HackTJ 11.0 — Best Lifestyle Hack',
    description:
      'AI-powered document analyzer that extracts calendar event details from any text or PDF and exports them as .ICS files. Streams GPT responses as they arrive and enriches locations via Google Maps Places API for precise address data.',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Google Maps API'],
    github: 'https://github.com/ray-shen-me/cider',
    live: 'https://ciderai.tech',
  },
];
