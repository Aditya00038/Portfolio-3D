export const PROJECTS_DATA = [
  {
    id: 1,
    num: "01",
    category: "CIVIC TECH · PLATFORM",
    title: "Parivartan — Transforming Civic Issues into Action",
    description: "Designed and built a smart civic engagement and workforce management platform that connects citizens directly with municipal field staff to resolve local infrastructure issues.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/parivartan.jpeg",
    domain: "Civic Tech · Platform",
    tags: ["PRODUCT DESIGNER", "REVENUE BOOST"],
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    longDescription: "Parivartan is a next-generation civic platform that empowers citizens to report and track infrastructure issues directly with local authorities. By integrating real-time geolocation mapping, secure feedback loops, and dynamic task status flows, the portal optimizes workforce dispatching for municipal councils while fostering community accountability."
  },
  {
    id: 2,
    num: "02",
    category: "FINTECH · AI",
    title: "DhanSathi — Smart Savings Platform",
    description: "An AI-powered personal financial tracker that helps users build healthy savings habits through goal-oriented saving structures and predictive expense analytics.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/DhanSathi.jpeg",
    domain: "Fintech · AI Platform",
    tags: ["USABILITY TESTER", "USER RESEARCH"],
    tech: ["React", "Redux", "FastAPI", "Python"],
    longDescription: "DhanSathi is an intelligent personal finance advisory suite designed to help users budget efficiently and reach their financial goals. Built with predictive expense forecasting and visual savings trackers, it transforms complex transaction ledgers into clear, actionable strategies."
  },
  {
    id: 3,
    num: "03",
    category: "HEALTH TECH · AI",
    title: "Glyvora — AI Wellness Platform",
    description: "An intelligent diabetes and metabolic health tracker that processes user dietary intake and blood sugar logs to deliver actionable AI-driven dietary recommendations.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/Glyvora.png",
    domain: "Health Tech · AI",
    tags: ["UX AUDIT", "MOBILE DEV"],
    tech: ["React Native", "Python", "Firebase", "Scikit-Learn"],
    longDescription: "Glyvora leverages data analytics to monitor metabolic trends and suggest personalized meal choices. By connecting blood glucose updates with nutritional logs, the platform identifies glycemic trends to guide users toward healthier dietary habits."
  },
  {
    id: 4,
    num: "04",
    category: "LAB TECH · INVENTORY",
    title: "ChemStock — Chemical Inventory Management System",
    description: "Production-grade chemistry inventory and audit management system designed for real laboratory workflows.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    livePreview: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/ChemStock.png",
    domain: "Lab Tech · Inventory",
    tags: ["PRODUCT DESIGN", "MVP", "B2B PLATFORM"],
    tech: ["Next.js", "TypeScript", "Firebase", "Tailwind", "PubChem API", "PWA"],
    problem: "Most academic laboratories still manage chemicals and equipment through manual registers or spreadsheets, leading to poor stock visibility, missing audit trails, inefficient reporting, and operational confusion.",
    solution: "ChemStock digitizes laboratory workflows through role-based access, real-time inventory tracking, audit logs, equipment management, reporting systems, and controlled administrative workflows.",
    features: [
      "Firebase Authentication & RBAC",
      "Chemical Inventory Management",
      "Equipment Checkout & Return System",
      "Audit Logs & Activity Tracking",
      "Low Stock Alerts",
      "PubChem API Integration",
      "Offline-ready PWA support"
    ],
    engineeringDecisions: "Used Firebase Authentication and Firestore for real-time data handling and simplified role-based workflows. Implemented RBAC to prevent accidental modifications and separate administrative access. Integrated PubChem API to provide structured chemical information directly inside workflows.",
    impact: "ChemStock replaced manual laboratory inventory workflows with structured digital operations including audit trails, stock tracking, and equipment management for real users inside a college chemistry laboratory."
  }
];
