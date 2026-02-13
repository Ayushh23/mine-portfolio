export const content = {
    nav: {
        logo: "Ayush.",
        links: [
            { text: "About", to: "about" },
            { text: "Skills", to: "skills" },
            { text: "Experience", to: "experience" },
            { text: "Projects", to: "projects" },
            { text: "Contact", to: "contact" },
        ],
    },

    hero: {
        title: "Hi, I'm Ayush Raj",
        subtitle: "Java & Spring Boot Developer",
        typingText: [
            "Java Developer",
            "Problem Solver",
            "AI App Builder",
        ],
        cta: "View My Work",
    },

    about: {
        title: "About Me",
        description:
            "I'm a Computer Science student focused on building scalable backend systems using Java and Spring Boot. I have hands-on experience designing REST APIs, integrating AI services like Google Gemini, working with MongoDB and Redis, and developing production-ready applications. My goal is to engineer reliable, efficient backend architectures that solve real-world problems.",

    },

    skills: {
        title: "Technical Skills",
        items: [
            { name: "Java", icon: "SiJava", color: "#ffff" },
            { name: "Spring Boot", icon: "SiSpringboot", color: "#6DB33F" },
            { name: "HTML", icon: "SiHtml5", color: "#f89820" },
            { name: "CSS", icon: "SiCss3", color: "#61DAFB" },
            { name: "JavaScript", icon: "SiJavascript", color: "#f8ea20ff" },
            { name: "Github", icon: "SiGithub", color: "#34312cff" },
            { name: "SQL", icon: "SiSql", color: "#06b4f8ff" },
            { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
            { name: "React", icon: "FaReact", color: "#61DAFB" },
            { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
            { name: "Android (Kotlin)", icon: "SiKotlin", color: "#7F52FF" },
            { name: "Git", icon: "SiGit", color: "#F05032" },
        ]
    },
    experience: {
        title: "Experience",
        items: [
            {
                role: "Software Development Intern",
                company: "Debadarsan Consulting Private Limited",
                duration: "May 2025 - July 2025",
                description: [
                    "Built an AI-powered Resume Analyzer using Gemini, PDF parsing, NLP scoring, MongoDB, and FastAPI, improving processing speed by 30%.",
                    "Integrated Gemini API for semantic analysis and automated scoring.",
                    "Developed a role-based e-learning platform with admin/student dashboards and dynamic chapter unlocking based on progress tracking."
                ]
            },
            {
                role: "Android Developer Intern",
                company: "LetsGrowMore",
                duration: "June 2024 - July 2024",
                description: [
                    "Created a Corona Tracker app with REST API integration using Retrofit and RecyclerView for real-time updates.",
                    "Implemented a Face Recognition app using Firebase ML Kit for emotion and attribute detection.",
                    "Participated in code reviews and agile meetings."
                ]
            }
        ]
    },

    projects: {
        title: "Featured Projects",
        items: [
            {
                title: "Spring Boot Project Generator (NPM CLI)",
                description:
                    "Published an npm CLI tool with 150+ downloads that generates production-ready Spring Boot 3 projects with all necessary architecture",
                image: "https://via.placeholder.com/600x400",
                tech: ["Spring Boot", "JavaScript", "SpringBoot Initializer Api"],
                github: "https://github.com/Ayushh23/SpringBoot-Project-Generator-CLI-tool",
                demo: "#"
            },
            {
                title: "AI Text Summarizer Browser Extension",
                description: "End-to-end AI browser extension that summarizes selected webpage text using a Spring Boot backend integrated with Google Gemini, delivering fast, readable summaries and productivity features.",
                image: "https://via.placeholder.com/600x400",
                tech: [
                    "Java",
                    "Spring Boot",
                    "REST APIs",
                    "WebClient",
                    "Google Gemini API",
                    "JavaScript",
                    "Chrome Extension"
                ],
                github: "https://github.com/Ayushh23/SummarizerAi",
                demo: "#"
            },

            {
                title: "AI Email Replier",
                description:
                    "Developed a Spring Boot web app integrated with Google Gemini API to generate tone-based, context-aware email replies in real time.",
                image: "https://via.placeholder.com/600x400",
                tech: ["Spring Boot", "Gemini API", "REST APIs"],
                github: "https://github.com/Ayushh23/Email-Replier",
            },

            {
                title: "Storm Weather Android App",
                description:
                    "Created a real-time weather forecasting Android app using Retrofit and OpenWeather API with location-based updates and smooth Lottie animations.",
                image: "https://via.placeholder.com/600x400",
                tech: ["Android", "Kotlin", "REST API"],
                github: "https://github.com/Ayushh23/Storm",
            }
        ]
    },

   

    testimonials: {
        title: "Recommendations",
        items: [
            {
                name: "Shivam Barnwal",
                role: "Product Manager at SurveySparrow",
                quote:
                    "Ayush led the end-to-end development of ExamSim, building a secure Spring Boot backend and delivering a reliable production-ready system. He focuses on solving real problems, not just writing code.",
                image: "https://media.licdn.com/dms/image/v2/D5635AQFA-MNeLy01Gg/profile-framedphoto-shrink_200_200/B56ZjZM43LHMAY-/0/1755990691670?e=1771578000&v=beta&t=vzuu8Gu0Qm9tui7euxmD7hdeIlUej_-nwTSeRp5qV88",
                linkedin: "https://www.linkedin.com/in/shivam-barnwal/"
            },
        ]
    },

    resume: {
        link: "Ayush-raj-resume.pdf"
    },
     contact: {
        title: "Get In Touch",
        description:
            "I'm actively seeking backend or software development opportunities where I can contribute to real-world, scalable systems and continue growing in Java and SpringBoot-based technologies.",
        email: "ayushrajj.231@gmail.com",
        socials: [
            { platform: "GitHub", url: "https://github.com/Ayushh23", icon: "FaGithub" },
            { platform: "LinkedIn", url: "https://linkedin.com/in/ayushraj2313", icon: "FaLinkedin" },
        ]
    },

    footer: {
        text: "Designed & Built by Ayush Raj",
    }
};
