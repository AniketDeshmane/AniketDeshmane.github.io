import { Injectable } from '@angular/core';

// Interfaces for type safety
export interface SiteConfig {
  title: string;
  description: string;
  keywords: string;
}

export interface NavigationConfig {
  home: string;
  about: string;
  experience: string;
  skills: string;
  contact: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: string;
    secondary: string;
  };
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export interface AboutConfig {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  cta: {
    text: string;
    url: string;
  };
}

export interface ExperiencePosition {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  current: boolean;
  startDate: Date;
  endDate?: Date;
  branchColor: string;
  experienceYears: number;
  experienceMonths: number;
}

export interface ExperienceTimelineConfig {
  title: string;
  subtitle: string;
  mergeMessage: string;
  totalExperience: string;
  featureBranches: string;
}

export interface ExperienceConfig {
  title: string;
  subtitle: string;
  timeline: ExperienceTimelineConfig;
  positions: ExperiencePosition[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface SkillsConfig {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export interface ContactFormConfig {
  name: {
    label: string;
    placeholder: string;
  };
  email: {
    label: string;
    placeholder: string;
  };
  subject: {
    label: string;
    placeholder: string;
  };
  message: {
    label: string;
    placeholder: string;
  };
  submit: string;
  sending: string;
  success: string;
  error: string;
}

export interface ContactInfoConfig {
  email: {
    label: string;
    value: string;
    icon: string;
  };
  location: {
    label: string;
    value: string;
    icon: string;
  };
  phone: {
    label: string;
    value: string;
    icon: string;
  };
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  description: string;
  form: ContactFormConfig;
  info: ContactInfoConfig;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface FooterConfig {
  description: string;
  social: SocialLink[];
  copyright: string;
}

export interface UIConfig {
  loading: string;
  error: string;
  notFound: string;
  backToHome: string;
  scrollToTop: string;
}

export interface AppConfig {
  site: SiteConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  about: AboutConfig;
  experience: ExperienceConfig;
  skills: SkillsConfig;
  contact: ContactConfig;
  footer: FooterConfig;
  ui: UIConfig;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig = {
    site: {
      title: "Aniket Deshmane",
      description: "Software Engineer & Full Stack Developer",
      keywords: "software engineer, full stack developer, angular, .net, portfolio"
    },
    navigation: {
      home: "Home",
      about: "About",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact"
    },
    hero: {
      title: "Hi, I'm Aniket Deshmane",
      subtitle: "Software Engineer & Full Stack Developer",
      description: "Passionate about creating innovative solutions and building scalable applications. Specialized in Angular, .NET, and modern web technologies.",
      cta: {
        primary: "View My Work",
        secondary: "Get In Touch"
      },
      stats: [
        {
          label: "Years Experience",
          value: "4+"
        },
        {
          label: "Projects Completed",
          value: "20+"
        },
        {
          label: "Technologies",
          value: "15+"
        }
      ]
    },
    about: {
      title: "About Me",
      subtitle: "A passionate software engineer with a love for clean code and innovative solutions",
      description: "I'm a dedicated software engineer with over 4 years of experience in full-stack development. I specialize in building scalable web applications using modern technologies like Angular, .NET, and cloud platforms. My passion lies in creating user-friendly solutions that solve real-world problems.",
      highlights: [
        "Full-stack development with Angular and .NET",
        "Cloud-native application development",
        "API design and microservices architecture",
        "Database design and optimization",
        "DevOps and CI/CD practices"
      ],
      cta: {
        text: "Download Resume",
        url: "/assets/resume.pdf"
      }
    },
    experience: {
      title: "Professional Experience",
      subtitle: "A journey through my professional growth and key contributions",
      timeline: {
        title: "Career Git History",
        subtitle: "My professional journey visualized as Git commits and feature branches",
        mergeMessage: "Merging {years}y {months}m to main career",
        totalExperience: "Total Career Experience: {years}y {months}m",
        featureBranches: "{count} feature branches merged into main career"
      },
      positions: [
        {
          id: "a1b2c3d4",
          company: "OneRock IT Services Private Limited",
          position: "Software Engineer",
          duration: "December 2024 - Present",
          location: "Mumbai, Maharashtra, India",
          description: ["Working as a consultant for BX"],
          current: true,
          startDate: new Date("2024-12-01"),
          branchColor: "#10b981",
          experienceYears: 0,
          experienceMonths: 9
        },
        {
          id: "e5f6g7h8",
          company: "Enago (Crimson Interactive)",
          position: "Software Engineer",
          duration: "May 2023 - November 2024",
          location: "Mumbai, Maharashtra, India",
          description: [
            "Revamped AfterSales module, increasing aftersales by 50% and improving user experience",
            "Developed UI using Angular 12 and backend with .NET 6 APIs running on Docker",
            "Created a BI/BA dashboard to track inquiries and conversions for stakeholders",
            "Integrated API into marketing page, reducing group account creation time and implemented backend security (blacklisting, rate limiting, authentication)",
            "Developed a WeChat API enabling Chinese users to check inquiry status via WeChat",
            "Reduced redundant API calls in Fapiao service, saving annually in tax per request"
          ],
          current: false,
          startDate: new Date("2023-05-01"),
          endDate: new Date("2024-11-30"),
          branchColor: "#f59e0b",
          experienceYears: 1,
          experienceMonths: 7
        },
        {
          id: "i9j0k1l2",
          company: "Tata Consultancy Services",
          position: "Assistant System Engineer",
          duration: "April 2021 - May 2023",
          location: "India",
          description: [
            "Enhancement/Development of WebApps using ASP.Net",
            "WebAPI development",
            "ASP.NET MVC 5 implementation",
            "Webforms development"
          ],
          current: false,
          startDate: new Date("2021-04-01"),
          endDate: new Date("2023-05-31"),
          branchColor: "#3b82f6",
          experienceYears: 2,
          experienceMonths: 2
        },
        {
          id: "m3n4o5p6",
          company: "Exaosis",
          position: ".NET Developer",
          duration: "January 2021 - February 2021",
          location: "India",
          description: ["Worked on the Frontend development"],
          current: false,
          startDate: new Date("2021-01-01"),
          endDate: new Date("2021-02-28"),
          branchColor: "#8b5cf6",
          experienceYears: 0,
          experienceMonths: 2
        }
      ]
    },
    skills: {
      title: "Skills & Technologies",
      subtitle: "Technologies and tools I work with",
      categories: [
        {
          name: "Frontend",
          skills: [
            {
              name: "Angular",
              level: 90,
              icon: "angular"
            },
            {
              name: "TypeScript",
              level: 85,
              icon: "typescript"
            },
            {
              name: "JavaScript",
              level: 90,
              icon: "javascript"
            },
            {
              name: "HTML/CSS",
              level: 95,
              icon: "html5"
            },
            {
              name: "React",
              level: 70,
              icon: "react"
            }
          ]
        },
        {
          name: "Backend",
          skills: [
            {
              name: ".NET Core",
              level: 85,
              icon: "dotnet"
            },
            {
              name: "C#",
              level: 90,
              icon: "csharp"
            },
            {
              name: "ASP.NET",
              level: 85,
              icon: "aspnet"
            },
            {
              name: "Web API",
              level: 90,
              icon: "api"
            },
            {
              name: "Entity Framework",
              level: 80,
              icon: "ef"
            }
          ]
        },
        {
          name: "Database",
          skills: [
            {
              name: "SQL Server",
              level: 85,
              icon: "sqlserver"
            },
            {
              name: "MySQL",
              level: 75,
              icon: "mysql"
            },
            {
              name: "MongoDB",
              level: 70,
              icon: "mongodb"
            }
          ]
        },
        {
          name: "Tools & Others",
          skills: [
            {
              name: "Git",
              level: 90,
              icon: "git"
            },
            {
              name: "Docker",
              level: 75,
              icon: "docker"
            },
            {
              name: "Azure",
              level: 70,
              icon: "azure"
            },
            {
              name: "AWS",
              level: 65,
              icon: "aws"
            }
          ]
        }
      ]
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's work together on your next project",
      description: "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!",
      form: {
        name: {
          label: "Name",
          placeholder: "Your name"
        },
        email: {
          label: "Email",
          placeholder: "your.email@example.com"
        },
        subject: {
          label: "Subject",
          placeholder: "What's this about?"
        },
        message: {
          label: "Message",
          placeholder: "Tell me about your project..."
        },
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again."
      },
      info: {
        email: {
          label: "Email",
          value: "aniket.deshmane@example.com",
          icon: "mail"
        },
        location: {
          label: "Location",
          value: "Mumbai, Maharashtra, India",
          icon: "map-pin"
        },
        phone: {
          label: "Phone",
          value: "+91 98765 43210",
          icon: "phone"
        }
      }
    },
    footer: {
      description: "Building digital experiences with passion and precision",
      social: [
        {
          name: "GitHub",
          url: "https://github.com/aniketdeshmane",
          icon: "github"
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/aniketdeshmane",
          icon: "linkedin"
        },
        {
          name: "Twitter",
          url: "https://twitter.com/aniketdeshmane",
          icon: "twitter"
        }
      ],
      copyright: "© 2024 Aniket Deshmane. All rights reserved."
    },
    ui: {
      loading: "Loading...",
      error: "Something went wrong",
      notFound: "Page not found",
      backToHome: "Back to Home",
      scrollToTop: "Scroll to top"
    }
  };

  constructor() {}

  getConfig(): AppConfig {
    return this.config;
  }

  getSiteConfig(): SiteConfig {
    return this.config.site;
  }

  getNavigationConfig(): NavigationConfig {
    return this.config.navigation;
  }

  getHeroConfig(): HeroConfig {
    return this.config.hero;
  }

  getAboutConfig(): AboutConfig {
    return this.config.about;
  }

  getExperienceConfig(): ExperienceConfig {
    return this.config.experience;
  }

  getSkillsConfig(): SkillsConfig {
    return this.config.skills;
  }

  getContactConfig(): ContactConfig {
    return this.config.contact;
  }

  getFooterConfig(): FooterConfig {
    return this.config.footer;
  }

  getUIConfig(): UIConfig {
    return this.config.ui;
  }
}
