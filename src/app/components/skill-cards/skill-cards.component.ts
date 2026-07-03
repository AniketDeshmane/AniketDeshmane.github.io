import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  lucideCode, 
  lucideCloud, 
  lucideDatabase, 
  lucideServer, 
  lucideSmartphone, 
  lucideBarChart3,
  lucideMessageSquare,
  lucideSearch,
  lucideInfo,
  lucideAward,
  lucideZap
} from '@ng-icons/lucide';
import { AppConfigService, SkillsConfig } from '../../shared/config/app-config';

interface SkillDetail {
  name: string;
  level: 'Core Stack' | 'Proficient' | 'Familiar';
  years: string;
  impact: string;
  tags: string[];
}

interface SkillCategoryMapped {
  name: string;
  icon: string;
  description: string;
  skills: SkillDetail[];
  activeSkill: SkillDetail | null;
}

@Component({
  selector: 'app-skill-cards',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ 
    lucideCode, 
    lucideCloud, 
    lucideDatabase, 
    lucideServer, 
    lucideSmartphone, 
    lucideBarChart3,
    lucideMessageSquare,
    lucideSearch,
    lucideInfo,
    lucideAward,
    lucideZap
  })],
  template: `
    <section class="py-24 bg-secondary/15 relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-6 sm:px-8">
        
        <!-- Section Header -->
        <div class="text-left mb-16 animate-fade-in">
          <span class="inline-block text-xs font-semibold tracking-widest text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full mb-4 uppercase">
            Skills
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            {{ config?.title || 'Technical Skills' }}
          </h2>
          <p class="text-muted-foreground text-base sm:text-lg max-w-2xl">
            Hover over any technology badge to unlock a real-world project impact and capability details.
          </p>
        </div>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          <!-- Loop through mapped categories (rendered as large bento blocks) -->
          <div 
            *ngFor="let cat of categories; let i = index"
            class="bg-card border border-border rounded-[2.5rem] shadow-soft p-6 sm:p-8 flex flex-col justify-between hover:shadow-card-hover hover:border-primary/25 transition-all duration-300 transform hover:-translate-y-0.5 animate-fade-in"
            [style.animation-delay.s]="i * 0.1">
            
            <div>
              <!-- Category Header -->
              <div class="flex items-center gap-4 mb-6">
                <div [class]="'p-3.5 rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0 ' + getSoftBgAndTextColor(cat.name)">
                  <ng-icon [name]="cat.icon" size="22"></ng-icon>
                </div>
                <div>
                  <h3 class="text-xl font-extrabold text-foreground">{{ cat.name }}</h3>
                  <p class="text-xs text-muted-foreground font-semibold mt-0.5">{{ cat.description }}</p>
                </div>
              </div>

              <!-- Skill Badges Container -->
              <div class="flex flex-wrap gap-2.5 mb-8">
                <button 
                  *ngFor="let skill of cat.skills"
                  (mouseenter)="cat.activeSkill = skill"
                  (click)="cat.activeSkill = skill"
                  [class]="'group relative inline-flex items-center gap-2 border px-4 py-2.5 rounded-2xl transition-all duration-200 ' + 
                    (cat.activeSkill?.name === skill.name 
                      ? 'bg-primary border-primary text-primary-foreground shadow-sm scale-[1.03]' 
                      : 'bg-secondary/40 border-border/60 hover:border-primary/20 text-foreground/80 hover:text-foreground hover:bg-secondary')"
                  aria-label="View skill details">
                  
                  <span class="text-sm font-bold">{{ skill.name }}</span>
                  
                  <!-- Skill Level Indicator Dot -->
                  <span 
                    [class]="'w-1.5 h-1.5 rounded-full ' + 
                      (cat.activeSkill?.name === skill.name ? 'bg-primary-foreground' : getLevelDotColor(skill.level))">
                  </span>
                </button>
              </div>
            </div>

            <!-- Dynamic Insight Panel (WOW Factor) -->
            <div class="relative bg-secondary/35 border border-border/40 rounded-3xl p-5 min-h-[170px] flex flex-col justify-between overflow-hidden">
              
              <!-- Background Icon Overlay -->
              <div class="absolute right-4 bottom-4 opacity-5 pointer-events-none select-none">
                <ng-icon name="lucideZap" size="90"></ng-icon>
              </div>

              <div *ngIf="cat.activeSkill; else noActiveSkill" class="space-y-4 animate-scale-in">
                
                <!-- Skill Meta Header -->
                <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
                  <div class="flex items-center gap-2.5">
                    <span class="text-sm font-black text-foreground">{{ cat.activeSkill.name }}</span>
                    <span [class]="'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ' + getLevelLabelClass(cat.activeSkill.level)">
                      {{ cat.activeSkill.level }}
                    </span>
                  </div>
                  <span class="text-xs font-bold text-muted-foreground font-mono">{{ cat.activeSkill.years }}</span>
                </div>

                <!-- Real-world Impact Content -->
                <div>
                  <span class="block text-[10px] font-extrabold uppercase text-primary tracking-wider mb-1 flex items-center gap-1">
                    <ng-icon name="lucideAward" size="12"></ng-icon>
                    <span>Real-world Impact</span>
                  </span>
                  <p class="text-xs sm:text-sm text-foreground/85 font-medium leading-relaxed">
                    {{ cat.activeSkill.impact }}
                  </p>
                </div>

                <!-- Associated Tech tags -->
                <div class="flex flex-wrap items-center gap-1.5 pt-1">
                  <span class="text-[9px] uppercase font-bold text-muted-foreground mr-1">Pairs with:</span>
                  <span 
                    *ngFor="let t of cat.activeSkill.tags"
                    class="text-[10px] font-bold bg-card border border-border/40 text-muted-foreground px-2 py-0.5 rounded-lg">
                    {{ t }}
                  </span>
                </div>

              </div>

              <!-- Default State (Nothing Hovered) -->
              <ng-template #noActiveSkill>
                <div class="flex flex-col items-center justify-center text-center h-full py-6 space-y-3">
                  <ng-icon name="lucideInfo" size="24" class="text-muted-foreground/60"></ng-icon>
                  <p class="text-xs sm:text-sm text-muted-foreground font-semibold max-w-sm">
                    Hover or tap any badge above to discover project achievements and technical pairings.
                  </p>
                </div>
              </ng-template>

            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class SkillCardsComponent implements OnInit {
  config: SkillsConfig | null = null;
  categories: SkillCategoryMapped[] = [];

  constructor(private configService: AppConfigService) {}

  ngOnInit() {
    this.config = this.configService.getSkillsConfig();
    this.setupSkillCategories();
  }

  private setupSkillCategories() {
    if (!this.config) return;

    this.categories = this.config.categories.map(category => {
      const skillsMapped = category.skills.map(skill => {
        const detail = this.getSkillDetails(skill.name);
        return {
          name: skill.name,
          level: detail.level,
          years: detail.years,
          impact: detail.impact,
          tags: detail.tags
        };
      });

      // Default the active skill to the first one in the list for better initial UX
      const activeSkill = skillsMapped.length > 0 ? skillsMapped[0] : null;

      return {
        name: category.name,
        icon: this.getIconForCategory(category.name),
        description: this.getDescriptionForCategory(category.name),
        skills: skillsMapped,
        activeSkill: activeSkill
      };
    });
  }

  private getIconForCategory(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Frontend': 'lucideSmartphone',
      'Backend': 'lucideServer',
      'Database': 'lucideDatabase',
      'Tools & Others': 'lucideCode'
    };
    return iconMap[category] || 'lucideCode';
  }

  private getDescriptionForCategory(category: string): string {
    const descMap: { [key: string]: string } = {
      'Frontend': 'Client-side applications and UI libraries',
      'Backend': 'Server logic, APIs, and business modules',
      'Database': 'Relational & non-relational storage layers',
      'Tools & Others': 'Version control, containers, and cloud hosts'
    };
    return descMap[category] || 'Specialized technologies';
  }

  // Soft backgrounds matching Arjun's aesthetics
  getSoftBgAndTextColor(category: string): string {
    const styleMap: { [key: string]: string } = {
      'Frontend': 'bg-blue-50 text-blue-600 border border-blue-100',
      'Backend': 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      'Database': 'bg-purple-50 text-purple-600 border border-purple-100',
      'Tools & Others': 'bg-orange-50 text-orange-600 border border-orange-100'
    };
    return styleMap[category] || 'bg-gray-50 text-gray-600 border border-gray-100';
  }

  getLevelDotColor(level: string): string {
    const map: { [key: string]: string } = {
      'Core Stack': 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
      'Proficient': 'bg-blue-500',
      'Familiar': 'bg-amber-500'
    };
    return map[level] || 'bg-gray-400';
  }

  getLevelLabelClass(level: string): string {
    const map: { [key: string]: string } = {
      'Core Stack': 'bg-emerald-50 text-emerald-700 border border-emerald-100',
      'Proficient': 'bg-blue-50 text-blue-700 border border-blue-100',
      'Familiar': 'bg-amber-50 text-amber-700 border border-amber-100'
    };
    return map[level] || 'bg-gray-50 text-gray-700';
  }

  // Dynamic content mapping database containing Aniket's real-world resume impact points
  private getSkillDetails(name: string): SkillDetail {
    const database: { [key: string]: SkillDetail } = {
      'Angular': {
        name: 'Angular',
        level: 'Core Stack',
        years: '4+ Years Exp',
        impact: 'Revamped the AfterSales modular interface, boosting conversion rates by 50% and lowering request response latency.',
        tags: ['TypeScript', 'Tailwind CSS', 'Docker', 'Web API']
      },
      'TypeScript': {
        name: 'TypeScript',
        level: 'Proficient',
        years: '4 Years Exp',
        impact: 'Used to write strongly-typed modular code, streamlining API communications and decreasing frontend runtime reference crashes.',
        tags: ['Angular', 'JavaScript', 'JSON']
      },
      'JavaScript': {
        name: 'JavaScript',
        level: 'Proficient',
        years: '4+ Years Exp',
        impact: 'Developed WeChat API endpoints allowing Chinese customers to check inquiries, and built secure rate-limiting logic.',
        tags: ['HTML/CSS', 'WeChat API', 'Entity Framework']
      },
      'HTML/CSS': {
        name: 'HTML/CSS',
        level: 'Proficient',
        years: '5 Years Exp',
        impact: 'Crafted pixel-perfect fluid components matching clean mockups. Standardized global styling parameters and layouts.',
        tags: ['Tailwind CSS', 'SCSS', 'Vite']
      },
      'React': {
        name: 'React',
        level: 'Familiar',
        years: '1 Year Exp',
        impact: 'Developed BA/BI metrics and conversions dashboards to report inquiry metrics visually for key project stakeholders.',
        tags: ['JavaScript', 'HTML/CSS', 'Chart.js']
      },
      '.NET Core': {
        name: '.NET Core',
        level: 'Core Stack',
        years: '4+ Years Exp',
        impact: 'Engineered high-performance REST APIs and containerized microservices deployed within cloud Docker environments.',
        tags: ['C#', 'SQL Server', 'Entity Framework', 'Docker']
      },
      'C#': {
        name: 'C#',
        level: 'Core Stack',
        years: '4+ Years Exp',
        impact: 'Designed secure backends featuring token rate-limiting, IP-based blacklists, and enterprise class architecture.',
        tags: ['.NET Core', 'ASP.NET', 'Web API']
      },
      'ASP.NET': {
        name: 'ASP.NET',
        level: 'Proficient',
        years: '4 Years Exp',
        impact: 'Built and maintained enterprise-scale web applications, legacy Webforms pages, and robust MVC 5 portals.',
        tags: ['C#', 'SQL Server', 'WebAPI']
      },
      'Web API': {
        name: 'Web API',
        level: 'Core Stack',
        years: '4+ Years Exp',
        impact: 'Integrated Amazon Simple Notification Service (SNS) to broadcast asynchronous publish/subscribe events securely.',
        tags: ['.NET Core', 'AWS SNS', 'C#']
      },
      'Entity Framework': {
        name: 'Entity Framework',
        level: 'Proficient',
        years: '3 Years Exp',
        impact: 'Optimized complex query expressions, cut redundant SQL joins, and resolved data fetch performance log bottlenecks.',
        tags: ['SQL Server', 'C#', '.NET Core']
      },
      'SQL Server': {
        name: 'SQL Server',
        level: 'Core Stack',
        years: '4+ Years Exp',
        impact: 'Designed database relational schemas, adjusted indexing structures, and implemented optimized stored procedures.',
        tags: ['Entity Framework', 'C#', 'Databases']
      },
      'MySQL': {
        name: 'MySQL',
        level: 'Familiar',
        years: '2 Years Exp',
        impact: 'Handled relational tables for logging user queries, WeChat messaging states, and client verification codes.',
        tags: ['Database', 'Web API']
      },
      'MongoDB': {
        name: 'MongoDB',
        level: 'Familiar',
        years: '2 Years Exp',
        impact: 'Managed non-relational document databases storing WeChat logging parameters and nested JSON responses.',
        tags: ['Databases', '.NET Core']
      },
      'Git': {
        name: 'Git',
        level: 'Proficient',
        years: '4+ Years Exp',
        impact: 'Coordinated feature branches, conflicts resolution, pull request code reviews, and source control release schedules.',
        tags: ['GitHub', 'CI/CD']
      },
      'Docker': {
        name: 'Docker',
        level: 'Proficient',
        years: '3 Years Exp',
        impact: 'Containerized .NET Core APIs, lowering deployment configuration variance between development and staging systems.',
        tags: ['.NET Core', 'Azure', 'Linux']
      },
      'Azure': {
        name: 'Azure',
        level: 'Familiar',
        years: '2 Years Exp',
        impact: 'Configured automated CI/CD code compilation actions and managed web app cloud instance configurations.',
        tags: ['Docker', 'Git', 'Cloud']
      },
      'AWS': {
        name: 'AWS',
        level: 'Familiar',
        years: '2 Years Exp',
        impact: 'Utilized Amazon SNS notification topics for dispatching automated alerts and processing asynchronous triggers.',
        tags: ['Web API', 'Amazon SNS']
      }
    };

    return database[name] || {
      name,
      level: 'Proficient',
      years: '3+ Years Exp',
      impact: `Experienced in utilizing ${name} to develop robust and functional web features.`,
      tags: ['Development']
    };
  }
}