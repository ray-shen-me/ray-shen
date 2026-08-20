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
    location: 'Lincoln, NE → Remote',
    role: 'Software Engineering Intern (Full-time Summer, Part-time Fall)',
    dates: 'May 2026 – Present',
    bullets: [
      "Shipped Hudl's real-time messaging platform to 7M+ directors, coaches, athletes, and parents, contributing across both system architecture and the core product surface within a single summer production launch cycle.",
      'Owned the messaging product\'s frontend end to end, delivering 30+ features built with React, TypeScript, SCSS, and Stream.io while partnering closely with stakeholders, engineers, and design counterparts on architecture decisions.',
      'Implemented net-new full-stack channel membership features, including adding and removing members and leaving channels, spanning C# and .NET backend services and GraphQL resolvers through to the React client.',
    ],
    tags: ['React', 'TypeScript', 'C#', '.NET', 'GraphQL', 'SCSS', 'Stream.io'],
  },
  {
    org: 'Northeastern SGA',
    location: 'Boston, MA',
    role: 'Software Engineer',
    dates: 'Sep 2025 – Dec 2025',
    bullets: [
      'Migrated the SGA website from Squarespace to a custom React application serving 38,000+ students and faculty, replacing a rigid hosted platform with full control over layout, routing, styling, and content.',
      'Designed a custom PostgreSQL relational schema to store page configurations and site content, enabling non-technical SGA staff to publish and revise pages without requiring any ongoing developer involvement.',
      'Developed customizable, responsive drag-and-drop page components with React Puck, wiring each component into the backend configuration API so that saved layouts persist and render correctly for every visitor.',
    ],
    tags: ['React', 'PostgreSQL', 'Node.js', 'React Puck'],
  },
  {
    org: 'Prometheus',
    location: 'Remote',
    role: 'Software Engineer, Pro Bono',
    dates: 'Oct 2025 – Dec 2025',
    bullets: [
      'Delivered the web presence for a nonprofit providing services to survivors of domestic violence, contributing roughly 60 hours pro bono alongside a small volunteer engineering team across a single academic semester.',
      'Created and implemented an intake questionnaire that matches survivors to relevant community services based on their responses, reducing the time and effort required to locate appropriate local support.',
      'Deployed the live site on Vercel to 250+ survivors, prioritizing accessibility and survivor-conscious frontend design throughout, from color contrast and keyboard navigation to clear, legible page structure.',
    ],
    tags: ['React', 'TypeScript', 'Vercel'],
  },
];
