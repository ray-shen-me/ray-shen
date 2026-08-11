export interface Job {
  org: string;
  location: string;
  role: string;
  dates: string;
  bullets: string[];
  tags: string[];
}

export const experience: Job[] = [
  {
    org: 'Hudl',
    location: 'Lincoln, NE',
    role: 'Software Engineering Intern',
    dates: 'May 2026 – Present',
    bullets: [
      "Contributed to shipping Hudl's real-time messaging platform to 7M+ directors, coaches, athletes, and parents.",
      'Delivered 30+ features across system architecture and messaging in a single production launch cycle.',
      'Developed production features using Stream.io, React, SCSS, TypeScript, and GraphQL.',
    ],
    tags: ['React', 'TypeScript', 'GraphQL', 'SCSS', 'Stream.io'],
  },
  {
    org: 'Northeastern SGA',
    location: 'Boston, MA',
    role: 'Software Engineer',
    dates: 'Sep 2025 – Dec 2025',
    bullets: [
      'Migrated the SGA website from Squarespace to React, reaching 38,000+ students and faculty.',
      'Designed a custom PostgreSQL database to store page configurations and content.',
      'Built customizable React Puck drag-and-drop components connected to a Node.js backend.',
    ],
    tags: ['React', 'PostgreSQL', 'Node.js', 'Puck'],
  },
  {
    org: 'Eduruna',
    location: 'Woodbridge, VA',
    role: 'Software Development Fellow',
    dates: 'Jun 2024 – Aug 2024',
    bullets: [
      "Led a team of 7 fellows to build and enhance a local nonprofit's web presence.",
      'Managed project timelines and client communications; 100% of deliverables completed on schedule.',
      'Contributed to front-end design and development, increasing online engagement by 400%.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];
