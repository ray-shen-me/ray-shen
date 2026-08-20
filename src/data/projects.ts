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
      'Course planner that generates personalized recommendations from AI insights and parsed PDF transcripts, mapping each student\'s completed coursework against their outstanding degree requirements. Backed by a Python scraping pipeline maintaining 87,000+ university courses in Firestore, with a drag-and-drop scheduler that balances difficulty across semesters and surfaces prerequisite conflicts.',
    tags: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Gemini', 'Python'],
    github: 'https://github.com/rayyshen',
    live: null,
  },
  {
    name: 'EcoJustice',
    award: 'Hack the Nest — Grand Prize Winner',
    description:
      'Interactive analytics map visualizing EPA, CDC, and Census data with Next.js and the Google Maps API, layering several federal datasets into a single navigable county-level view of the country. Maps Social Vulnerability Index scores against industrial site locations to surface environmental disparities by county, and applies Gemini to generate personalized advocacy letters citing county-specific figures.',
    tags: ['Next.js', 'React', 'Google Maps API', 'Gemini'],
    github: 'https://github.com/rayyshen',
    live: null,
  },
  {
    name: 'NU SGA Site',
    award: null,
    description:
      "Full migration of Northeastern SGA's website from Squarespace to a custom React application. Serves 38,000+ students and faculty with a configurable drag-and-drop CMS backed by PostgreSQL, giving non-technical staff full control over layout and content without developer involvement.",
    tags: ['React', 'PostgreSQL', 'Node.js', 'React Puck'],
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
    live: null,
  },
];
