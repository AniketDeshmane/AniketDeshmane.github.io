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
    <section id="experience" class="py-20 bg-background">
      <div class="container mx-auto px-4">
                 <div class="text-center mb-16">
           <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent">
             {{ config?.title || 'Professional Experience' }}
           </h2>
           <p class="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
             {{ config?.subtitle || 'A journey through my professional growth and key contributions' }}
           </p>
           
           <!-- Experience Summary -->
           <div class="bg-muted/20 border border-border rounded-lg p-6 max-w-2xl mx-auto">
             <div class="text-lg font-semibold text-foreground mb-2">
               {{ getTotalExperienceText() }}
             </div>
             <div class="text-sm text-muted-foreground">
               {{ getFeatureBranchesText() }}
             </div>
           </div>
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
                    class="absolute -left-4 top-1/2 w-0 h-1.5 transition-all duration-700 ease-out opacity-0"
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
                        <span class="font-semibold">{{ getMergeMessage(exp) }}</span>
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
                 </div>
       </div>
     </section>
  `,
  styles: [`
    .arrow-active {
      width: 2rem !important;
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
export class ExperienceTimelineComponent implements OnInit {
  hoveredExperience: string | null = null;
  config: ExperienceConfig | null = null;
  experiences: ExperiencePosition[] = [];

  constructor(private configService: AppConfigService) {}

  ngOnInit() {
    this.config = this.configService.getExperienceConfig();
    this.experiences = this.config.positions.map(exp => ({
      ...exp,
      current: !exp.endDate, // Dynamic: true if no endDate, false if endDate exists
      experienceYears: this.calculateExperienceYears(exp),
      experienceMonths: this.calculateExperienceMonths(exp)
    }));
  }

  get totalExperienceYears(): number {
    const totalMonths = this.experiences.reduce((total, exp) => total + this.getExperienceMonths(exp), 0);
    return Math.floor(totalMonths / 12);
  }

  get totalExperienceMonths(): number {
    const totalMonths = this.experiences.reduce((total, exp) => total + this.getExperienceMonths(exp), 0);
    return totalMonths % 12;
  }

  calculateExperienceYears(exp: ExperiencePosition): number {
    const endDate = exp.endDate || new Date(); // Use current date if no endDate (current position)
    const startDate = exp.startDate;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalMonths = Math.floor(diffDays / 30.44); // Average days per month
    const years = Math.floor(totalMonths / 12);
    return years;
  }

  calculateExperienceMonths(exp: ExperiencePosition): number {
    const endDate = exp.endDate || new Date(); // Use current date if no endDate (current position)
    const startDate = exp.startDate;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalMonths = Math.floor(diffDays / 30.44); // Average days per month
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
    
    if (!this.config?.timeline.mergeMessage) {
      return `Merging ${years}y ${months}m to career`;
    }
    
    return this.config.timeline.mergeMessage
      .replace('{years}', years.toString())
      .replace('{months}', months.toString());
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
    
    if (currentCount > 0) {
      return `${completedCount} feature branches merged into career, ${currentCount} in progress`;
    } else {
      return `${completedCount} feature branches merged into career`;
    }
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