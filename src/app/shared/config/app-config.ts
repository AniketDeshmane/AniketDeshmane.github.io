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
  current?: boolean; // Optional - will be calculated dynamically
  startDate: Date;
  endDate?: Date;
  branchColor: string;
  experienceYears?: number; // Optional - will be calculated dynamically
  experienceMonths?: number; // Optional - will be calculated dynamically
  techStack?: string[]; // Technologies used in this role
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
        url: "/assets/Resume.docx"
      }
    },
    experience: {
      title: "Professional Experience",
      subtitle: "A journey through my professional growth and key contributions",
      timeline: {
        title: "Career Git History",
        subtitle: "My professional journey visualized as Git commits and feature branches",
        mergeMessage: "Merged {years}y {months}m to career",
        totalExperience: "Total Career Experience: {years}y {months}m",
        featureBranches: "{count} feature branches merged into career"
      },
      positions: [
        {
          id: "a1b2c3d4",
          company: "OneRock Infotech",
          position: "Senior Software Developer",
          duration: "Nov 2024 - Present",
          location: "Mumbai · Hybrid",
          description: [
            "Developed and integrated microservices in .NET 8, leveraging Autofac for dependency injection, Quartz Scheduler for internal cache refresh, and FIX protocol integration with the proprietary trading software to enable seamless communication with the FIX engine.",
            "Implemented asynchronous communication between microservices using Amazon SQS and SNS, ensuring high scalability and reliability.",
            "Assisted in debugging UI issues, performing root cause analysis, and validating end-to-end test flows to ensure smooth application performance.",
            "Followed best coding practices and wrote clean, testable, and maintainable code with maximum unit test coverage.",
            "Worked in a cloud-native environment using AWS, ECS, Linux, SQL, and Splunk for monitoring and deployment."
          ],
          startDate: new Date("2024-11-01"),
          branchColor: "#10b981",
          current: true,
          techStack: [".NET 8", "Autofac", "Quartz", "SQS/SNS", "FIX Protocol", "ECS", "AWS", "SQL", "Splunk", "Linux"]
        },
        {
          id: "d4e5f6g7",
          company: "Crimson Interactive",
          position: "Software Engineer",
          duration: "May 2023 - Nov 2024",
          location: "Mumbai · Hybrid",
          description: [
            "Revamped the existing AfterSales module, resulting in a 50% increase in aftersales and improved user experience. Developed the UI using Angular 12 and the backend with .NET 6 Core, APIs running on docker.",
            "Developed an Angular-based UI dashboard for BI and BA stakeholders, providing timely insights into inquiries and assignments. The dashboard tracks the progress of inquiries converted into potential clients.",
            "Developed an API and integrated it into the marketing page, reducing the time for users to create a group account. Implemented backend security measures including blacklisting, rate limiting, and authentication for the API.",
            "Developed a WeChat API for the external team, enabling Chinese users to check the status of their inquiries or assignments via WeChat.",
            "Reduced redundant API calls in the existing Fapiao invoice Windows service, leading to an annual cost reduction of ¥5,000 in tax."
          ],
          startDate: new Date("2023-05-01"),
          endDate: new Date("2024-11-01"),
          branchColor: "#f59e0b",
          techStack: ["ASP.NET MVC", "4.5X Framework", ".NET Core 6", "Angular 12", "Docker", "Linux", "AWS", "SQL", "Kibana"]
        },
        {
          id: "g7h8i9j0",
          company: "Tata Consultancy Services",
          position: "Assistant Software Engineer",
          duration: "April 2021 - May 2023",
          location: "Hyderabad · Remote",
          description: [
            "Developed in-house web applications using DotNet Core and MVC Framework, and implemented OAuth for MailSent via Azure App Registration and MailKit.",
            "Worked on complex SQL stored procedures, views, SSIS packages, and SQL jobs, making code changes as per client and business requirements.",
            "Deployed code changes to the IIS server using NANT/Git tools."
          ],
          startDate: new Date("2021-04-01"),
          endDate: new Date("2023-05-01"),
          branchColor: "#3b82f6",
          techStack: ["ASP.NET MVC", "Azure Web Apps", "Git", "SQL"]
        },
        {
          id: "i9j0k1l2",
          company: "Exaosis",
          position: ".NET Developer",
          duration: "Jan 2021 - Apr 2021",
          location: "Mumbai · Remote",
          description: [
            "Part of the backend team developing internal projects",
            "Worked heavily on Azure basics and deployment practices"
          ],
          startDate: new Date("2021-01-01"),
          endDate: new Date("2021-04-30"),
          branchColor: "#8b5cf6",
          techStack: [".NET", "Azure", "Backend Development"]
        }
      ]
    },
    skills: {
      title: "Skills & Technologies",
      subtitle: "Technologies and tools I work with",
      categories: [
        {
          name: "Frameworks",
          skills: [
            { name: ".NET 8", level: 90, icon: "lucideLayers" },
            { name: "ASP.NET Core", level: 90, icon: "lucideServer" },
            { name: "MVC Core", level: 90, icon: "lucideLayoutTemplate" },
            { name: "Entity Framework Core", level: 90, icon: "lucideDatabase" },
            { name: "Dapper", level: 90, icon: "lucideZap" },
            { name: "Quartz", level: 90, icon: "lucideClock" }
          ]
        },
        {
          name: "Front-End",
          skills: [
            { name: "Angular 12+", level: 90, icon: "lucideLayout" },
            { name: "TypeScript", level: 90, icon: "lucideCode2" },
            { name: "HTML5", level: 90, icon: "lucideFileCode" },
            { name: "CSS3", level: 90, icon: "lucidePalette" },
            { name: "WPF", level: 90, icon: "lucideMonitor" }
          ]
        },
        {
          name: "Back-End",
          skills: [
            { name: "C#", level: 90, icon: "lucideTerminal" },
            { name: "Microservices", level: 90, icon: "lucideNetwork" },
            { name: "WCF", level: 90, icon: "lucideShare2" },
            { name: "FIX Protocol", level: 90, icon: "lucideActivity" },
            { name: "RESTful APIs", level: 90, icon: "lucideWebhook" },
            { name: "T-SQL", level: 90, icon: "lucideDatabase" }
          ]
        },
        {
          name: "DevOps & Tools",
          skills: [
            { name: "Docker", level: 90, icon: "lucideBox" },
            { name: "ECS", level: 90, icon: "lucideCloud" },
            { name: "Ubuntu/Linux", level: 90, icon: "lucideTerminal" },
            { name: "Git", level: 90, icon: "lucideGitBranch" },
            { name: "TFS", level: 90, icon: "lucideGitMerge" },
            { name: "Splunk", level: 90, icon: "lucideLineChart" }
          ]
        },
        {
          name: "Database",
          skills: [
            { name: "MS SQL Server", level: 90, icon: "lucideDatabase" },
            { name: "MySQL", level: 90, icon: "lucideDatabase" },
            { name: "SQLite", level: 90, icon: "lucideDatabase" },
            { name: "DynamoDB", level: 90, icon: "lucideDatabase" },
            { name: "LINQ", level: 90, icon: "lucideCode" }
          ]
        },
        {
          name: "Cloud & Messaging",
          skills: [
            { name: "AWS (SQS, SNS, ECS)", level: 90, icon: "lucideCloud" },
            { name: "Azure (Web Apps)", level: 90, icon: "lucideCloud" }
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
          value: "aniketmdeshmane@gmail.com",
          icon: "mail"
        },
        location: {
          label: "Location",
          value: "Mumbai, Maharashtra, India",
          icon: "map-pin"
        },
        phone: {
          label: "Phone",
          value: "+91 96196 63812",
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
