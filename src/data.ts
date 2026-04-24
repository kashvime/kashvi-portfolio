export const ROLES = [
  'Software Engineer',
  'Full-Stack Engineer',
  'CS @ Northeastern \'26',
]

export const TICKER = [
  'TypeScript', 'React', 'Node.js', 'Python', 'MongoDB', 'Socket.io',
  'SQL', 'AWS', 'Playwright', 'REST APIs', 'System Design', 'Test Coverage',
  'Real-Time Systems', 'Clean Architecture', 'CI/CD', 'Git',
]

export const STATS = [
  { value: 3.5,  decimals: 1, suffix: '',  label: "GPA · Dean's List" },
  { value: 80,   decimals: 0, suffix: '%', label: 'Automation impact @ MGH' },
  { value: 3,    decimals: 0, suffix: '',  label: 'Test layers on GameNite' },
  { value: 3,    decimals: 0, suffix: '+', label: 'Deployed projects' },
]

export const PROJECTS = [
  {
    num: '01', name: 'GameNite', year: '2026',
    tagline: 'Full-stack real-time multiplayer platform',
    tags: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    desc: 'Engineered a multiplayer gaming platform with a generic GameLogic<State,View> interface — adding a new game requires exactly one file per architectural layer. Real-time game rooms over Socket.io with sub-100ms state sync and Elo-based league rankings. Three-tier test coverage: unit (Vitest), integration, and E2E (Playwright).',
    live: 'https://gameniteserver-production.up.railway.app',
    github: 'https://github.com/kashvime/gamenite',
    readme: {
      overview: 'A full-stack multiplayer gaming platform supporting Chess, Nim, and Guess. Built with a generic `GameLogic<State, View>` interface so each new game only touches one file per layer — the architecture enforces separation of concerns at compile time.',
      sections: [
        {
          title: 'Architecture',
          points: [
            'Generic `GameLogic<State, View>` interface — new games require exactly one file per layer',
            'Real-time game rooms over Socket.io with sub-100ms state sync',
            'Elo rating engine with Bronze / Silver / Gold league tiers and match history',
            'REST API + WebSocket hybrid: HTTP for auth/profile, Socket.io for live game state',
          ],
        },
        {
          title: 'Testing',
          points: [
            'Unit tests (Vitest) covering game logic, Elo calculations, and edge cases',
            'Integration tests for API routes and database interactions',
            'End-to-end tests (Playwright) covering room creation, joining, and full game flows',
          ],
        },
        {
          title: 'Features',
          points: [
            'Live multiplayer rooms — create public or private games, invite friends',
            'Elo-based leaderboard per game type with league rankings',
            'Player profiles with match history, win rate, and per-game ratings',
            'Computer opponent mode for solo play',
          ],
        },
      ],
    },
  },
  {
    num: '02', name: 'Speech Emotion Classifier', year: '2025',
    tagline: 'End-to-end ML inference pipeline',
    tags: ['Python', 'PyTorch', 'scikit-learn', 'Librosa', 'Streamlit'],
    desc: 'Built a full inference pipeline from raw audio ingestion through feature extraction (MFCC, mel-spectrograms) to runtime model selection. Benchmarked CNN, SVM, KNN, and MLP architectures with documented accuracy-latency trade-offs. CNN achieved macro-F1 of 0.98 on held-out test set.',
    github: 'https://github.com/kashvime',
    readme: {
      overview: 'An end-to-end audio classification pipeline that takes raw `.wav` files, extracts acoustic features, and runs inference across four model architectures selectable at runtime via a Streamlit interface.',
      sections: [
        {
          title: 'Pipeline',
          points: [
            'Raw audio ingestion → MFCC and mel-spectrogram feature extraction via Librosa',
            'Runtime model selection: CNN, SVM, KNN, or MLP — swap without restarting',
            'Streamlit UI for uploading audio and viewing predictions with confidence scores',
          ],
        },
        {
          title: 'Model Results',
          points: [
            'CNN achieved highest macro-F1 of 0.98 on held-out test set',
            'SVM and MLP used as strong baselines for comparison',
            'Documented accuracy-latency trade-offs across all four architectures',
          ],
        },
      ],
    },
  },
  {
    num: '03', name: 'Nicotine Use Monitor', year: '2025',
    tagline: 'Event-sourced MERN app · HackBeanpot 2025',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    desc: 'Designed an event-sourcing architecture where every action is an immutable append — enabling O(1) writes, full timeline reconstruction, and arbitrary state replay from any point in history. Shipped a complete MERN stack from scratch in 48 hours.',
    github: 'https://github.com/kashvime',
    readme: {
      overview: 'A full-stack health tracking app built in 48 hours at HackBeanpot 2025. Users log nicotine use events via REST API; the backend persists them as an immutable event log in MongoDB, enabling full timeline reconstruction and state replay.',
      sections: [
        {
          title: 'Architecture',
          points: [
            'Event-sourcing pattern: every action is an immutable append to a MongoDB event log',
            'O(1) writes — no updates or deletes, just appends',
            'State at any point in time reconstructed by replaying the event stream',
            'REST API for event ingestion with Express + Node.js',
          ],
        },
        {
          title: 'Built in 48 hours',
          points: [
            'Complete MERN stack from scratch — MongoDB, Express, React, Node.js',
            'Designed data model, implemented API, and wired React frontend end-to-end',
          ],
        },
      ],
    },
  },
]

export const EXPERIENCE = [
  {
    role: 'Clinical Data Management Co-op',
    org: 'Massachusetts General Hospital',
    period: 'Jun – Dec 2025',
    tags: ['Python', 'SQL', 'Automation', 'LLM Eval'],
    desc: 'Developed Python automation to generate reports for 30+ clinical sites, cutting reporting time by 10+ hours per cycle. Implemented modular SQL queries to detect cross-table inconsistencies, reducing manual review by 80%. Explored LLM tools through structured prompt testing to assess workflow automation opportunities.',
  },
  {
    role: 'Research Assistant',
    org: 'Brain Game Center',
    period: 'Sep 2024 – Present',
    tags: ['R', 'AWS', 'Data Analysis'],
    desc: 'Validated cross-platform consistency of cognitive training software by analyzing task output data in R to identify discrepancies affecting system reliability. Audited sensitive participant datasets in AWS for a double-blind study. Presented findings at Northeastern\'s Research Expo.',
  },
  {
    role: 'Data Analyst Intern',
    org: 'Northeastern University',
    period: 'May – Jun 2024',
    tags: ['Python', 'ETL', 'JSON', 'CSV'],
    desc: 'Built a Python ETL pipeline for multi-format data ingestion (JSON, CSV), cutting manual preprocessing by ~3 hrs/dataset. Led a cross-functional team of 5 to analyze structured datasets and generate insights that informed platform content strategy.',
  },
  {
    role: 'AI Research Intern',
    org: 'Zero to 1',
    period: 'Jun – Sep 2023',
    tags: ['AI Evaluation', 'Technical Analysis'],
    desc: 'Evaluated AI capabilities and platform workflows across 6 competing applications to identify technical gaps and inform functional requirements for an AI startup client.',
  },
]

export const SKILLS = [
  ['Languages', 'Python · TypeScript · JavaScript · SQL · Java · R'],
  ['Frontend',  'React · Vite · Tailwind · Streamlit'],
  ['Backend',   'Node.js · Express · MongoDB · Socket.io · REST APIs'],
  ['ML / AI',   'PyTorch · scikit-learn · Librosa · CNN · SVM · MLP · LLM Eval'],
  ['Tools',     'Git · Linux · Bash · AWS · Vitest · Playwright'],
]

export type SkillConnection = {
  type: 'project' | 'experience' | 'course'
  name: string
  detail: string
}

export const SKILL_GRAPH: Record<string, { how: string; connections: SkillConnection[] }> = {
  Python: {
    how: 'My primary language — data pipelines, ML models, and automation scripts across three co-ops.',
    connections: [
      { type: 'experience', name: 'Massachusetts General Hospital', detail: 'Automated 30+ clinical site reports; modular SQL validation tools' },
      { type: 'experience', name: 'Northeastern University', detail: 'ETL pipeline cutting preprocessing by ~3 hrs/dataset' },
      { type: 'project',    name: 'Speech Emotion Classification', detail: 'MFCC & mel-spectrogram feature extraction + model training' },
    ],
  },
  TypeScript: {
    how: 'Full-stack type safety — from React components to generic game engine interfaces.',
    connections: [
      { type: 'project', name: 'GameNite',                        detail: 'GameLogic<State,View> interface; type-safe REST + Socket events' },
      { type: 'course',  name: 'CS 4530 · Software Engineering',  detail: 'Semester-long TypeScript project with Agile sprints' },
    ],
  },
  React: {
    how: 'My go-to frontend — hooks, context, custom components, and complex real-time state.',
    connections: [
      { type: 'project', name: 'GameNite',               detail: 'Real-time game UI synced live via Socket.io' },
      { type: 'project', name: 'Nicotine Use Monitor',   detail: 'MERN stack frontend built in 48 hours' },
      { type: 'course',  name: 'CS 4530 · Software Engineering', detail: 'Component architecture + testing pyramid' },
    ],
  },
  'Node.js': {
    how: 'Backend APIs, real-time server logic, and REST endpoints.',
    connections: [
      { type: 'project', name: 'GameNite',             detail: 'Socket.io game rooms, Elo engine, REST API' },
      { type: 'project', name: 'Nicotine Use Monitor', detail: 'Express + MongoDB backend in 48 hours' },
    ],
  },
  MongoDB: {
    how: 'Document store for real-time and event-sourced applications.',
    connections: [
      { type: 'project', name: 'GameNite',             detail: 'Player stats, league rankings, game history' },
      { type: 'project', name: 'Nicotine Use Monitor', detail: 'Immutable event log with timeline reconstruction' },
    ],
  },
  'Socket.io': {
    how: 'Real-time bi-directional communication — the backbone of live multiplayer.',
    connections: [
      { type: 'project', name: 'GameNite', detail: 'Live game rooms: player joins, move broadcasting, spectating' },
    ],
  },
  PyTorch: {
    how: 'Deep learning — CNN architectures for audio classification.',
    connections: [
      { type: 'project', name: 'Speech Emotion Classification', detail: 'CNN with mel-spectrogram inputs → 0.98 macro-F1' },
      { type: 'course',  name: 'CS 4420 · Machine Learning',    detail: 'Neural nets, backpropagation, training loops' },
    ],
  },
  'scikit-learn': {
    how: 'Classical ML — baseline models, evaluation pipelines, and model comparison.',
    connections: [
      { type: 'project', name: 'Speech Emotion Classification', detail: 'SVM, KNN, MLP baselines compared against CNN' },
    ],
  },
  SQL: {
    how: 'Complex clinical queries, validation logic, and large-scale data extraction.',
    connections: [
      { type: 'experience', name: 'Massachusetts General Hospital', detail: 'Reduced manual review by 80% with modular validation queries' },
      { type: 'experience', name: 'Northeastern University',        detail: 'Data extraction for multi-format ETL pipeline' },
    ],
  },
  AWS: {
    how: 'Cloud storage, data integrity audits, and deployment infrastructure.',
    connections: [
      { type: 'experience', name: 'Brain Game Center · Northeastern', detail: 'Audited datasets for a double-blind cognitive study' },
      { type: 'experience', name: 'Massachusetts General Hospital',   detail: 'LLM tooling exploration on cloud infrastructure' },
    ],
  },
  R: {
    how: 'Statistical analysis and data validation for cognitive science research.',
    connections: [
      { type: 'experience', name: 'Brain Game Center · Northeastern', detail: 'Cross-platform consistency validation; presented at Research Expo' },
    ],
  },
  Playwright: {
    how: 'End-to-end browser testing — full user flow automation.',
    connections: [
      { type: 'project', name: 'GameNite',                       detail: 'E2E tests: room creation, joins, full game flows' },
      { type: 'course',  name: 'CS 4530 · Software Engineering', detail: 'Testing pyramid: unit → integration → E2E' },
    ],
  },
  Java: {
    how: 'OOP fundamentals and data structures — the language of my core CS coursework.',
    connections: [
      { type: 'course', name: 'CS 3500 · Object-Oriented Design', detail: 'Design patterns, inheritance, interfaces' },
      { type: 'course', name: 'CS 2510 · Fundamentals of CS 2',   detail: 'Algorithmic problem solving in Java' },
    ],
  },
  Git: {
    how: 'Version control, branching strategy, and collaborative team workflows.',
    connections: [
      { type: 'project', name: 'GameNite',                       detail: 'Feature branches, PRs, semantic commits' },
      { type: 'course',  name: 'CS 4530 · Software Engineering', detail: 'Agile team Git workflow with code reviews' },
    ],
  },
  JavaScript: {
    how: 'The runtime under TypeScript — async patterns, closures, and DOM APIs.',
    connections: [
      { type: 'project', name: 'GameNite',             detail: 'Async Socket.io handlers, game state management' },
      { type: 'project', name: 'Nicotine Use Monitor', detail: 'MERN stack, built end-to-end in 48 hours' },
    ],
  },
}
