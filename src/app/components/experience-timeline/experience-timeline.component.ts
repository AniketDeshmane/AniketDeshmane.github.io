import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBuilding, lucideCalendar, lucideMapPin, lucideGitBranch, lucideGitMerge, lucideGitCommit } from '@ng-icons/lucide';
import { CardComponent } from '../ui/card/card.component';
import { BadgeComponent } from '../ui/badge/badge.component';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  current?: boolean;
  startDate: Date;
  endDate?: Date;
  branchColor: string;
  experienceYears: number;
  experienceMonths: number;
}

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, NgIconComponent],
  viewProviders: [provideIcons({ lucideBuilding, lucideCalendar, lucideMapPin, lucideGitBranch, lucideGitMerge, lucideGitCommit })],
  template: `
    <section id="experience" class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            A journey through my professional growth and key contributions
          </p>
        </div>

        <div class="max-w-6xl mx-auto relative">
                                <!-- Git-style timeline container -->
           <div class="relative">
             
             <!-- Vertical timeline line -->
             <div class="absolute left-8 top-0 bottom-0 flex flex-col">
               <!-- Main timeline line -->
               <div [class]="'absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 transition-all duration-500 ' + 
                 (hoveredExperience ? 'opacity-100 shadow-lg shadow-orange-500/50' : 'opacity-30')"></div>
             </div>
             
             <!-- Experience cards positioned as Git commits -->
             <div class="space-y-8 ml-16">
              <div 
                *ngFor="let exp of experiences; let i = index"
                class="relative flex items-start gap-8 animate-fade-in"
                [style.animation-delay.s]="i * 0.3">
                
                <!-- Experience card as feature branch -->
                <div class="flex-1 relative">
                  <!-- Animated arrow on hover -->
                  <div 
                    class="absolute -left-4 top-1/2 w-0 h-0.5 transition-all duration-700 ease-out opacity-0"
                    [class.arrow-active]="hoveredExperience === exp.id"
                    [style.background]="exp.branchColor"
                    [style.transform]="'translateY(-50%)'">
                  </div>
                  
                  <app-card 
                    class="bg-card-gradient border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer relative"
                    (mouseenter)="onExperienceHover(exp.id)"
                    (mouseleave)="onExperienceLeave()">
                    
                    <!-- Floating merge message -->
                    <div 
                      *ngIf="hoveredExperience === exp.id"
                      class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 border border-green-400/30 rounded-lg px-4 py-3 text-xs font-mono text-white shadow-xl animate-fade-in z-30">
                      <div class="flex items-center gap-2">
                        <ng-icon name="lucideGitMerge" size="14" class="text-green-100"></ng-icon>
                                                 <span class="font-semibold">Merging {{ getExperienceYears(exp) }}y {{ getExperienceMonths(exp) }}m to main career</span>
                      </div>
                    </div>
                    
                    <div class="p-6">
                      <!-- Git commit header -->
                      <div class="flex items-center gap-2 mb-3">
                        <ng-icon name="lucideGitCommit" size="16" class="text-primary"></ng-icon>
                        <span class="text-xs text-muted-foreground font-mono">commit {{ exp.id }}</span>
                        <ng-icon name="lucideGitBranch" size="16" [style.color]="exp.branchColor"></ng-icon>
                        <span class="text-xs font-mono" [style.color]="exp.branchColor">feature/{{ getBranchName(exp.company) }}</span>
                      </div>
                      
                      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h3 class="text-xl text-foreground flex items-center gap-2 font-semibold">
                          <ng-icon name="lucideBuilding" size="20" class="text-primary"></ng-icon>
                          {{ exp.company }}
                        </h3>
                        <app-badge 
                          *ngIf="exp.current" 
                          class="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-3 py-1 rounded-full shadow-sm border border-green-400/20">
                          Current
                        </app-badge>
                      </div>
                      
                      <div class="text-primary font-semibold text-lg mb-2">
                        {{ exp.position }}
                      </div>
                      
                      <div class="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground mb-4">
                        <div class="flex items-center gap-1">
                          <ng-icon name="lucideCalendar" size="16"></ng-icon>
                          {{ exp.duration }}
                        </div>
                        <div class="flex items-center gap-1">
                          <ng-icon name="lucideMapPin" size="16"></ng-icon>
                          {{ exp.location }}
                        </div>
                      </div>
                      
                      <ul class="space-y-2">
                        <li 
                          *ngFor="let desc of exp.description"
                          class="text-muted-foreground flex items-start gap-2">
                          <div class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {{ desc }}
                        </li>
                      </ul>
                    </div>
                  </app-card>
                </div>
              </div>
            </div>
            
            
          </div>
          
          <!-- Total experience summary -->
          <div class="mt-12 text-center">
            <div class="inline-flex items-center gap-4 p-4 bg-card-gradient border border-border rounded-lg">
              <ng-icon name="lucideGitMerge" size="24" class="text-primary"></ng-icon>
              <div>
                <div class="text-lg font-semibold text-foreground">
                  Total Career Experience: {{ totalExperienceYears }}y {{ totalExperienceMonths }}m
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ experiences.length }} feature branches merged into main career
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .arrow-active {
      width: 4rem !important;
      opacity: 1 !important;
    }
    
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
    }
  `]
})
export class ExperienceTimelineComponent {
  hoveredExperience: string | null = null;
  
  experiences: Experience[] = [
    {
      id: "a1b2c3d4",
      company: "OneRock IT Services Private Limited",
      position: "Software Engineer",
      duration: "December 2024 - Present",
      location: "Mumbai, Maharashtra, India",
      description: ["Working as a consultant for BX"],
      current: true,
      startDate: new Date('2024-12-01'),
      branchColor: "#10b981", // green
      experienceYears: 0,
      experienceMonths: 2
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
      startDate: new Date('2023-05-01'),
      endDate: new Date('2024-11-30'),
      branchColor: "#f59e0b", // amber
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
      startDate: new Date('2021-04-01'),
      endDate: new Date('2023-05-31'),
      branchColor: "#3b82f6", // blue instead of red
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
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-02-28'),
      branchColor: "#8b5cf6", // purple
      experienceYears: 0,
      experienceMonths: 2
    }
  ];

  get totalExperienceYears(): number {
    return this.experiences.reduce((total, exp) => total + this.getExperienceYears(exp), 0);
  }

  get totalExperienceMonths(): number {
    return this.experiences.reduce((total, exp) => total + this.getExperienceMonths(exp), 0);
  }

  getExperienceYears(exp: Experience): number {
    if (exp.current) {
      // Calculate dynamic duration for current position
      const endDate = new Date();
      const startDate = exp.startDate;
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      return years;
    }
    return exp.experienceYears;
  }

  getExperienceMonths(exp: Experience): number {
    if (exp.current) {
      // Calculate dynamic duration for current position
      const endDate = new Date();
      const startDate = exp.startDate;
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalMonths = Math.floor(diffDays / 30.44); // Average days per month
      const years = Math.floor(diffDays / 365);
      const months = totalMonths - (years * 12);
      return months;
    }
    return exp.experienceMonths;
  }

  onExperienceHover(experienceId: string) {
    this.hoveredExperience = experienceId;
  }

  onExperienceLeave() {
    this.hoveredExperience = null;
  }

  getBranchName(company: string): string {
    return company.toLowerCase().replace(/\s+/g, '-');
  }
}