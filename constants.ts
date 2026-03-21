
export const PROFILE_DATA = {
    name: "Tilak Nanavati",
    title: "Principal Software Engineer",
    positioningStatement: "I architect and build high-impact, scalable AI platforms and data systems, translating complex engineering innovation into tangible business value.",
    contact: {
        email: "tilak.nanavati@gmail.com",
        linkedin: "https://www.linkedin.com/in/tilak-nanavati-49b716a8/",
        github: "https://github.com/tilak-nanavati-dev",
        twitter: "https://twitter.com/tilak_nanavati", // Placeholder, update with actual Twitter URL if available.
        resumeUrl: "https://drive.google.com/file/d/id/view?usp=sharing", // Placeholder, update with actual resume URL if available.
    },
    location: "Ahmedabad, Gujarat, India",
};

export const NAV_LINKS = [
    { name: "Impact", href: "#impact" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Awards", href: "#achievements" },
    { name: "Contact", href: "#contact" },
];

export const IMPACT_HIGHLIGHTS = [
    { value: "70+", label: "Tool Integrations", description: "Platform integrating 70+ engineering tools for quality intelligence.", color: "blue", icon: "cube" },
    { value: "10M+", label: "Records Optimized", description: "Improved SQL query performance on datasets exceeding 10 million records.", color: "indigo", icon: "chart" },
    { value: "50%", label: "Load Time Reduction", description: "Reduced dashboard data load times by 50% through back-end optimization.", trend: "up", color: "emerald", icon: "bolt" },
    { value: "100K+", label: "Queries Per Day", description: "Built a scalable LLM-powered knowledge platform handling over 100K daily queries.",color: "violet", icon: "users" },
];

export const PROJECTS = [
    {
        title: "Requirement Quality Intelligence Platform",
        description:
            "An AI-powered intelligence platform that analyzes requirements and engineering work items to detect risk patterns, failure themes, and historical correlations. Built using FastAPI and Next.js with a RAG-based LLM pipeline.",
        longDescription:
            "Combines vector search over historical requirement data with an LLM reasoning layer to surface buried risk signals before they become defects. The RAG pipeline indexes work items from Azure DevOps and Jira, enabling engineers to query patterns like 'requirements that historically caused regression bugs' — turning institutional memory into a queryable intelligence layer.",
        impact: [
            "Reduced requirement defect escape rate by 35%",
            "Cut pre-sprint risk review time by 50%",
            "RAG pipeline ingesting 500K+ work items",
        ],
        tags: ["Python", "FastAPI", "Next.js", "PGVector", "RAG", "Reciprocal Rank Fusion"],
        category: "AI/ML",
        status: "Production",
        featured: true,
        year: "2025",
        github: "",
        demo: "",
    },
    {
        title: "CleverDev — Quality Intelligence Platform",
        description:
            "Led development of a platform integrating 70+ engineering tools (GitHub, Jira, Azure DevOps, etc.) into real-time analytics dashboards. Optimized SQL queries across 10M+ record datasets, cutting dashboard load times by 50%.",
        longDescription:
            "Unified fragmented engineering signals — CI/CD pipelines, code review cycles, ticket velocity, test coverage — into a single pane of glass for engineering leaders. Designed a multi-tenant data architecture supporting 5+ orgs simultaneously, with row-level security and configurable KPI thresholds.",
        impact: [
            "Integrated 70+ engineering tools",
            "50% faster dashboard load on 10M+ records",
            "Adopted across 5+ enterprise orgs",
        ],
        tags: ["Next.js", "Spring Boot", "MS SQL", "System Architecture", "Performance Optimization"],
        category: "Data Systems",
        status: "Production",
        featured: true,
        year: "2021",
        github: "",
        demo: "",
    },
    {
        title: "OpsHub Data Bridge — AI Knowledge Hub",
        description:
            "Architected an LLM-powered knowledge platform using RAG pipelines to provide context-aware insights from internal documentation and historical ops data. The FastAPI backend handles 100K+ queries per day across 5+ business units.",
        longDescription:
            "Replaced static internal wikis with a conversational intelligence layer — engineers can ask natural language questions and get answers grounded in the company's actual documentation, past incident reports, and runbooks. Implemented semantic chunking, hybrid BM25 + vector retrieval, and a reranking layer to improve answer fidelity.",
        impact: [
            "100K+ queries/day at production scale",
            "Serving 5+ business units",
            "Reduced internal support ticket volume by 30%",
        ],
        tags: ["Python", "FastAPI", "LLM", "RAG", "LangChain", "Vector Search"],
        category: "AI/ML",
        status: "Production",
        featured: false,
        year: "2020",
        github: "",
        demo: "",
    },
    {
        title: "OM4ADO — Azure DevOps Migration Automation",
        description:
            "Automated the full Azure DevOps migration process end-to-end, replacing manual upgrade workflows with a scripted pipeline. Reduced manual effort by 60% and improved release reliability by 40%.",
        longDescription:
            "Built a migration orchestrator that handles work item remapping, area/iteration path translation, attachment migration, and post-migration validation checks — all previously done by hand over multiple days. Integrated automated smoke tests post-migration to catch data loss before go-live.",
        impact: [
            "60% reduction in manual upgrade effort",
            "40% improvement in release reliability",
            "Migration cycle cut from days to hours",
        ],
        tags: ["Azure DevOps", "Automation", "CI/CD", "Python", "Reliability"],
        category: "DevOps",
        status: "Production",
        featured: false,
        year: "2019",
        github: "",
        demo: "",
    },
    {
        title: "Salesforce CRM Automation — Accenture",
        description:
            "Developed custom Apex triggers and Lightning Web Components for a major enterprise client at Accenture, reducing manual data entry by 60% and significantly improving UI responsiveness and user adoption.",
        longDescription:
            "Redesigned a legacy Salesforce org with bloated process builders and workflow rules causing governor limit breaches. Replaced with bulkified Apex trigger handlers, platform events for async processing, and reusable LWC components — resulting in a dramatically faster, more maintainable CRM.",
        impact: [
            "60% reduction in manual data entry",
            "Eliminated governor limit breaches",
            "Deployed via Jenkins CI pipeline",
        ],
        tags: ["Salesforce", "Apex", "Lightning Web Components", "Jenkins", "Automation"],
        category: "Platform Eng",
        status: "Production",
        featured: false,
        year: "2018",
        github: "",
        demo: "",
    },
];

export const SKILLS = {
    "Languages": ["Java", "JavaScript", "Python"],
    "Frameworks & Libraries": ["Spring Boot", "Next.js", "REST", "Hibernate", "LangChain"],
    "AI/ML": ["LLMs", "Retrieval-Augmented Generation (RAG)", "Vector Search", "AI-driven Analytics"],
    "Databases": ["MS SQL Server", "PostgreSQL", "MySQL", "Performance Tuning"],
    "DevOps & Tools": ["Azure DevOps", "Docker", "Jenkins", "GitHub", "Git"],
};


export const EXPERIENCE = [
    {
        role: "Principal Software Engineer",
        company: "OpsHub Technologies Private Limited",
        companyUrl: "https://www.opshub.com/",
        period: "June 2020 – Present",
        location: "Ahmedabad, Gujarat, India",
        type: "Full-time",
        current: true,
        highlights: [
            "Integrated 70+ engineering tools",
            "100K+ daily LLM queries",
            "60% faster migrations",
        ],
        description: [
            "Pioneered a Quality Intelligence Platform integrating data from 70+ engineering tools into real-time analytics dashboards, giving engineering leaders a unified view of delivery health.",
            "Architected and built scalable Spring Boot APIs and optimized Next.js dashboards for 10M+ record datasets, cutting dashboard load times by 50%.",
            "Led design and deployment of an LLM-powered knowledge hub using RAG pipelines, handling 100K+ daily queries across 5+ business units.",
            "Automated the Azure DevOps migration pipeline end-to-end, reducing manual upgrade effort by 60% and improving release reliability by 40%.",
        ],
        skills: ["Python", "Java", "Next.js", "FastAPI", "LangChain", "LLM", "RAG", "Spring Boot", "Hibernate", "MS SQL", "PostgreSQL", "Performance Optimization"],
    },
    {
        role: "Associate Software Engineer",
        company: "Accenture",
        companyUrl: "https://www.accenture.com/in-en",
        period: "June 2017 – April 2018",
        location: "Pune, Maharashtra, India",
        type: "Full-time",
        current: false,
        highlights: [
            "60% reduction in manual data entry",
            "40% better deployment reliability",
            "Enterprise-scale Salesforce CRM",
        ],
        description: [
            "Implemented custom Apex triggers and Lightning Web Components for an enterprise client, reducing manual data entry by 60% and eliminating governor limit breaches.",
            "Delivered fully integrated Salesforce modules with Jenkins CI/CD pipelines, enhancing deployment reliability by 40% and cutting release cycle time.",
            "Redesigned key UI flows in Lightning Experience, significantly improving responsiveness and user adoption across the enterprise application.",
        ],
        skills: ["Salesforce", "Apex", "Lightning Web Components", "SOQL", "Jenkins", "CI/CD", "Automation"],
    },
];

export const EDUCATION = [
    {
        degree: "Master of Technology — Information & Communication Technology (ICT)",
        institution: "Dhirubhai Ambani Institute of Information and Communication Technology",
        institutionUrl: "https://www.daiict.ac.in/",
        period: "July 2018 – June 2020",
        location: "Gandhinagar, Gujarat, India",
        grade: "9.60 / 10 CPI",
        current: false,
        notes: "Specialized in AI/ML applications — coursework spanned deep learning, NLP, intelligent systems, and large-scale data processing, forming the academic backbone of my work in LLMs and retrieval architectures.",
        highlights: [
            "Specialization in AI/ML"
        ],
        coursework: [
            "Machine Learning",
            "Deep Learning",
            "Natural Language Processing",
            "Information Retrieval",
            "Big Data Analytics",
            "Distributed Systems",
            "Computer Vision",
            "Optimization Techniques",
        ],
    },
    {
        degree: "Bachelor of Engineering — Computer Engineering",
        institution: "L.D. College of Engineering, Ahmedabad",
        institutionUrl: "https://ldce.ac.in/",
        period: "July 2013 – June 2017",
        location: "Ahmedabad, Gujarat, India",
        grade: "9.10 / 10 CPI",
        current: false,
        notes: "Strong foundation in computer science fundamentals — algorithms, operating systems, databases, and software engineering — that underpins every system I design and build today.",
        highlights: [
            "GTU Affiliated",
        ],
        coursework: [
            "Data Structures & Algorithms",
            "Operating Systems",
            "Database Management",
            "Computer Networks",
            "Object-Oriented Programming",
            "Software Engineering",
            "Compiler Design",
            "Theory of Computation",
        ],
    },
];

export const CERTIFICATIONS = [
    {
        name: "Microsoft Certified: Azure Data Scientist Associate",
        issuer: "Microsoft",
    }
];

export const ACHIEVEMENTS = [
    {
        name: "President's Gold Medal",
        details: "Awarded for outstanding academic excellence — highest honour conferred by DA-IICT to a graduating student.",
        category: "Academics",
        year: "2020",
        rank: "Gold Medal",
        issuer: "DA-IICT",
        icon: "academic",
        featured: true,
    },
    {
        name: "Men's Singles & Doubles — Table Tennis Champion",
        details: "Won both the singles and doubles titles at the Annual Corporate Sports Tournament, competing against players across the organisation.",
        category: "Sports",
        year: "2023",
        rank: "1st Place",
        issuer: "OpsHub Technologies",
        icon: "trophy",
        featured: true,
    },
    {
        name: "Top 25 Coder",
        details: "Ranked in the top 25 coders across Gujarat in a state-level competitive programming contest organised by Gujarat Technological University.",
        category: "Competitive Programming",
        year: "2017",
        rank: "Top 25 / State",
        issuer: "Gujarat Technological University",
        icon: "code",
        featured: true,
    },
    {
        name: "3rd Place — Zone-level Chess",
        details: "Secured third position in a zone-level chess competition, demonstrating strategic thinking under competitive pressure.",
        category: "Sports",
        year: "2016",
        rank: "3rd Place",
        issuer: "Zone-level Competition",
        icon: "chess",
        featured: true,
    },
];
