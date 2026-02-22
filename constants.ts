
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
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
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
        description: "An AI-powered intelligence platform that analyzes requirements and engineering workitems to detect risk patterns, failure themes, and historical correlations. Built using FastAPI and Next.js with a RAG-based LLM pipeline. T",
        tags: ["Python", "FastAPI", "Next.js", "PGVector", "LLM", "RAG", "LangChain"],
    },
    {
        title: "CleverDev (Quality Intelligence Platform)",
        description: "Led development of a platform integrating 70+ engineering tools (GitHub, Jira, etc.) into real-time analytics dashboards. Optimized SQL queries for 10M+ record datasets, cutting load times by 50%.",
        tags: ["Next.js", "Spring Boot", "MS SQL", "System Architecture", "Performance Optimization"],
    },
    {
        title: "OpsHub Data Bridge (AI Knowledge Hub)",
        description: "Architected an LLM-powered knowledge platform using RAG pipelines to provide context-aware insights. The FastAPI backend scalably handles 100K+ queries per day across 5+ business units.",
        tags: ["Python", "FastAPI", "LLM", "RAG", "LangChain", "Vector Search"],
    },
    {
        title: "OM4ADO Automation",
        description: "Automated the Azure DevOps migration process, reducing manual upgrade effort by over 60% and improving release reliability by 40%.",
        tags: ["Azure DevOps", "Automation", "CI/CD", "Reliability"],
    },
    {
        title: "Salesforce Implementation",
        description: "Developed custom Apex triggers and Lightning components at Accenture, reducing manual data entry by 60% and enhancing UI responsiveness for a major client.",
        tags: ["Salesforce", "Apex", "Lightning", "Jenkins", "Automation"],
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
        period: "June 2020 – Present",
        description: [
            "Pioneered a Quality Intelligence Platform integrating data from 70+ engineering tools.",
            "Architected and built scalable Spring Boot APIs and optimized Next.js dashboards for 10M+ record datasets.",
            "Led design of an LLM-powered knowledge hub with RAG, handling 100K+ daily queries.",
            "Automated Azure DevOps migration, reducing upgrade effort by 60% and improving reliability by 40%."
        ],
        companyUrl: "https://www.opshub.com/",
        location: "Ahmedabad, Gujarat, India",
        type: "Full-time",
        current: true,
        skills: ["Java", "Next.js", "Python", "FastAPI", "LLM", "RAG", "Azure DevOps", "Performance Optimization"]
    },
    {
        role: "Associate Software Engineer",
        company: "Accenture",
        period: "June 2017 – April 2018",
        description: [
            "Implemented Apex triggers and Lightning components, reducing manual data entry by 60%.",
            "Delivered integrated Salesforce modules, enhancing deployment reliability by 40% with Jenkins automation.",
            "Improved UI responsiveness and overall user experience for enterprise-scale applications."
        ],
        companyUrl: "https://www.accenture.com/in-en",
        location: "Pune, Maharashtra, India",
        type: "Full-time",
        skills: ["Salesforce","Lightning", "Classic", "Apex", "Triggers", "Automation"]
    },
];

export const EDUCATION = [
    {
        degree: "Master of Technology (ICT with AI/ML)",
        institution: "DA-IICT",
        period: "2018 – 2020",
        notes: "Awarded President's Gold Medal for academic excellence."
    },
    {
        degree: "Bachelor of Engineering (Computer Engineering)",
        institution: "LD College of Engineering",
        period: "2013 – 2017",
        notes: "Secured 2nd position in final-year project competition."
    },
];

export const CERTIFICATIONS = [
    {
        name: "Microsoft Certified: Azure Data Scientist Associate",
        issuer: "Microsoft",
    }
];

export const ACHIEVEMENTS = [
    { name: "President's Gold Medal", details: "For outstanding academic excellence at DA-IICT (June 2020)." },
    { name: "Men's Singles & Doubles Table Tennis Champion", details: "Annual Corporate Sports Tournament." },
    { name: "Top 25 Coder", details: "State-level Coding Competition by Gujarat Technological University." },
    { name: "3rd Position in Chess", details: "Zone-level Chess Competition." }
];
