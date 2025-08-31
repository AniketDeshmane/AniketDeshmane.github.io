import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBuilding, lucideCalendar, lucideMapPin, lucideGitBranch, lucideGitMerge, lucideGitCommit } from '@ng-icons/lucide';
import { CardComponent } from '../ui/card/card.component';
import { BadgeComponent } from '../ui/badge/badge.component';
import { AppConfigService, ExperienceConfig, ExperiencePosition } from '../../shared/config/app-config';

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, NgIconComponent],
  viewProviders: [provideIcons({ lucideBuilding, lucideCalendar, lucideMapPin, lucideGitBranch, lucideGitMerge, lucideGitCommit })],
     template: `
     <section id="experience" class="py-12 sm:py-16 lg:py-20 bg-background">
       <div class="container mx-auto px-4 sm:px-6 lg:px-8">
         <div class="text-center mb-12 sm:mb-16">
           <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent">
             {{ config?.title || 'Professional Experience' }}
           </h2>
           <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
             {{ config?.subtitle || 'A journey through my professional growth and key contributions' }}
           </p>
           
           <!-- Experience Summary -->
           <div class="bg-muted/20 border border-border rounded-lg p-4 sm:p-6 max-w-2xl mx-auto mx-4">
             <div class="text-base sm:text-lg font-semibold text-foreground mb-2">
               {{ getTotalExperienceText() }}
             </div>
             <div class="text-xs sm:text-sm text-muted-foreground">
               {{ getFeatureBranchesText() }}
             </div>
           </div>
         </div>

         <div class="max-w-6xl mx-auto relative">
           <!-- Git-style timeline container -->
           <div class="relative">
             
                           <!-- Vertical timeline line - hidden on mobile, visible on larger screens -->
              <div class="hidden sm:block absolute left-8 top-0 bottom-0 flex flex-col">
                <!-- Main timeline line -->
                <div 
                  [ngClass]="{
                    'timeline-line-active': hoveredExperience,
                    'timeline-line-default': !hoveredExperience
                  }"
                  [style.background]="hoveredBranchColor ? hoveredBranchColor : 'linear-gradient(to bottom, #4ade80, #16a34a)'"
                  [style.box-shadow]="hoveredBranchColor ? '0 10px 15px -3px rgba(0,0,0,0.3)' : 'none'"
                  class="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500">
                </div>
              </div>
             
             <!-- Experience cards positioned as Git commits -->
             <div class="space-y-6 sm:space-y-8 sm:ml-16">
               <div 
                 *ngFor="let exp of experiences; let i = index"
                 class="relative flex items-start gap-4 sm:gap-8 animate-fade-in"
                 [style.animation-delay.s]="i * 0.3">
                 
                 <!-- Experience card as feature branch -->
                 <div class="flex-1 relative">
                                       <!-- Animated branch line from middle - hidden on mobile -->
                    <div 
                      class="hidden sm:block absolute -left-4 top-1/2 w-0 h-1.5 transition-all duration-700 ease-out opacity-0"
                      [class.arrow-active]="hoveredExperience === exp.id"
                      [style.background]="exp.branchColor"
                      [style.transform]="'translateY(-50%)'">
                    </div>
                   
                   <app-card 
                     class="bg-card-gradient border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer relative"
                     (mouseenter)="onExperienceHover(exp.id)"
                     (mouseleave)="onExperienceLeave()">
                     
                     <!-- Floating merge message - adjusted for mobile -->
                     <div 
                       *ngIf="hoveredExperience === exp.id"
                       class="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 border border-green-400/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs font-mono text-white shadow-xl animate-fade-in z-30 max-w-[90vw] sm:max-w-none">
                       <div class="flex items-center gap-1 sm:gap-2">
                         <ng-icon name="lucideGitMerge" size="12" class="sm:text-sm text-green-100"></ng-icon>
                         <span class="font-semibold text-xs sm:text-sm">{{ getMergeMessage(exp) }}</span>
                       </div>
                     </div>
                     
                     <div class="p-4 sm:p-6">
                       <!-- Git commit header - simplified on mobile -->
                       <div class="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                         <ng-icon name="lucideGitCommit" size="14" class="sm:text-base text-primary"></ng-icon>
                         <span class="text-xs text-muted-foreground font-mono hidden sm:inline">commit {{ exp.id }}</span>
                         <ng-icon name="lucideGitBranch" size="14" class="sm:text-base" [style.color]="exp.branchColor"></ng-icon>
                         <span class="text-xs font-mono hidden sm:inline" [style.color]="exp.branchColor">feature/{{ getBranchName(exp.company) }}</span>
                       </div>
                       
                       <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 sm:mb-3">
                         <h3 class="text-lg sm:text-xl text-foreground flex items-center gap-2 font-semibold">
                           <ng-icon name="lucideBuilding" size="18" class="sm:text-xl text-primary"></ng-icon>
                           <span class="break-words">{{ exp.company }}</span>
                         </h3>
                         <app-badge 
                           *ngIf="exp.current" 
                           class="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-2 sm:px-3 py-1 rounded-full shadow-sm border border-green-400/20 text-xs sm:text-sm self-start sm:self-auto">
                           Current
                         </app-badge>
                       </div>
                       
                       <div class="text-primary font-semibold text-base sm:text-lg mb-2">
                         {{ exp.position }}
                       </div>
                       
                       <div class="flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                         <div class="flex items-center gap-1">
                           <ng-icon name="lucideCalendar" size="14" class="sm:text-base"></ng-icon>
                           <span class="break-words">{{ exp.duration }}</span>
                         </div>
                         <div class="flex items-center gap-1">
                           <ng-icon name="lucideMapPin" size="14" class="sm:text-base"></ng-icon>
                           <span class="break-words">{{ exp.location }}</span>
                         </div>
                       </div>
                       
                       <ul class="space-y-1 sm:space-y-2">
                         <li 
                           *ngFor="let desc of exp.description"
                           class="text-muted-foreground flex items-start gap-2 text-sm sm:text-base">
                           <div class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                           <span class="break-words">{{ desc }}</span>
                         </li>
                       </ul>
                     </div>
                   </app-card>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   `,
     styles: [`
     .timeline-line-default {
       opacity: 0.3;
     }
     
     .timeline-line-active {
       opacity: 1;
     }
     
     .arrow-active {
       width: 2rem !important;
       opacity: 1 !important;
       animation: branch-connect 0.7s ease-out forwards;
     }
     
     @keyframes branch-connect {
       0% {
         width: 0;
         opacity: 0;
       }
       50% {
         width: 1rem;
         opacity: 0.7;
       }
       100% {
         width: 2rem;
         opacity: 1;
       }
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
export class ExperienceTimelineComponent implements OnInit {
  hoveredExperience: string | null = null;
  config: ExperienceConfig | null = null;
  experiences: ExperiencePosition[] = [];
  hoveredBranchColor: string | null = null;

  constructor(private configService: AppConfigService) {}

  ngOnInit() {
    console.log('🔄 ExperienceTimelineComponent: ngOnInit started');
    this.config = this.configService.getExperienceConfig();
    console.log('📋 Config loaded:', this.config);
    
    this.experiences = this.config.positions.map(exp => {
      const current = !exp.endDate;
      const experienceYears = this.calculateExperienceYears(exp);
      const experienceMonths = this.calculateExperienceMonths(exp);
      
      console.log(`🏢 ${exp.company}:`, {
        startDate: exp.startDate,
        endDate: exp.endDate || 'Current',
        current: current,
        experienceYears: experienceYears,
        experienceMonths: experienceMonths,
        display: `${experienceYears}y ${experienceMonths}m`
      });
      
      return {
        ...exp,
        current: current,
        experienceYears: experienceYears,
        experienceMonths: experienceMonths
      };
    });
    
    console.log('📊 Total experience calculation:', {
      totalYears: this.totalExperienceYears,
      totalMonths: this.totalExperienceMonths,
      display: `${this.totalExperienceYears}y ${this.totalExperienceMonths}m`
    });
    
    console.log('✅ ExperienceTimelineComponent: ngOnInit completed');
  }

  get totalExperienceYears(): number {
    const totalMonths = this.experiences.reduce((total, exp) => total + this.getExperienceMonths(exp), 0);
    const years = Math.floor(totalMonths / 12);
    console.log(`📊 Total experience calculation:`, {
      totalMonths: totalMonths,
      years: years,
      months: totalMonths % 12
    });
    return years;
  }

  get totalExperienceMonths(): number {
    const totalMonths = this.experiences.reduce((total, exp) => total + this.getExperienceMonths(exp), 0);
    const months = totalMonths % 12;
    console.log(`📊 Total months:`, months);
    return months;
  }

  calculateExperienceYears(exp: ExperiencePosition): number {
    const totalMonths = this.calculateExperienceMonths(exp);
    return Math.floor(totalMonths / 12);
  }

  calculateExperienceMonths(exp: ExperiencePosition): number {
    const endDate = exp.endDate || new Date(); // Use current date if no endDate (current position)
    const startDate = exp.startDate;
    
    console.log(`🔢 Calculating months for ${exp.company}:`, {
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
      isCurrent: !exp.endDate
    });
    
    // Calculate month difference more accurately
    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    let totalMonths = yearDiff * 12 + monthDiff;
    
    console.log(`📅 Month calculation:`, {
      yearDiff: yearDiff,
      monthDiff: monthDiff,
      initialTotalMonths: totalMonths
    });
    
    // Add 1 to include the current month (inclusive counting)
    totalMonths += 1;
    
    console.log(`➕ After adding 1 (inclusive):`, totalMonths);
    
    // Adjust for day of month - if we haven't reached the same day of the month, subtract 1
    if (endDate.getDate() < startDate.getDate()) {
      totalMonths -= 1;
      console.log(`➖ Subtracted 1 (day adjustment):`, totalMonths);
    } else {
      console.log(`✅ No day adjustment needed`);
    }
    
    console.log(`🎯 Final months for ${exp.company}:`, totalMonths);
    return totalMonths;
  }

  getExperienceYears(exp: ExperiencePosition): number {
    return this.calculateExperienceYears(exp);
  }

  getExperienceMonths(exp: ExperiencePosition): number {
    return this.calculateExperienceMonths(exp);
  }

  getMergeMessage(exp: ExperiencePosition): string {
    // Calculate years and months properly
    const totalMonths = this.getExperienceMonths(exp);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    console.log(`🔗 Merge message for ${exp.company}:`, {
      totalMonths: totalMonths,
      years: years,
      months: months,
      display: `${years}y ${months}m`
    });
    
    if (!this.config?.timeline.mergeMessage) {
      const message = `Merging ${years}y ${months}m to career`;
      console.log(`📝 Default merge message:`, message);
      return message;
    }
    
    const message = this.config.timeline.mergeMessage
      .replace('{years}', years.toString())
      .replace('{months}', months.toString());
    
    console.log(`📝 Custom merge message:`, message);
    return message;
  }

  getTotalExperienceText(): string {
    if (!this.config?.timeline.totalExperience) {
      return `Total Career Experience: ${this.totalExperienceYears}y ${this.totalExperienceMonths}m`;
    }
    
    return this.config.timeline.totalExperience
      .replace('{years}', this.totalExperienceYears.toString())
      .replace('{months}', this.totalExperienceMonths.toString());
  }

  getFeatureBranchesText(): string {
    // Count completed positions (inactive/merged)
    const completedPositions = this.experiences.filter(exp => !exp.current);
    const completedCount = completedPositions.length;
    
    // Count current positions (in progress)
    const currentPositions = this.experiences.filter(exp => exp.current);
    const currentCount = currentPositions.length;
    
    console.log(`🌿 Feature branches calculation:`, {
      completedPositions: completedPositions.map(p => p.company),
      completedCount: completedCount,
      currentPositions: currentPositions.map(p => p.company),
      currentCount: currentCount
    });
    
    if (currentCount > 0) {
      const message = `${completedCount} feature branches merged into career, ${currentCount} in progress`;
      console.log(`📝 Feature branches message:`, message);
      return message;
    } else {
      const message = `${completedCount} feature branches merged into career`;
      console.log(`📝 Feature branches message:`, message);
      return message;
    }
  }

  onExperienceHover(experienceId: string) {
    console.log(`🖱️ Hover started on experience:`, experienceId);
    this.hoveredExperience = experienceId;
    
    // Find the experience and get its branch color
    const experience = this.experiences.find(exp => exp.id === experienceId);
    if (experience) {
      this.hoveredBranchColor = experience.branchColor;
      console.log(`🎨 Branch color for hover:`, this.hoveredBranchColor);
    }
  }

  onExperienceLeave() {
    console.log(`🖱️ Hover ended`);
    this.hoveredExperience = null;
    this.hoveredBranchColor = null;
  }

  getBranchName(company: string): string {
    return company.toLowerCase().replace(/\s+/g, '-');
  }
}