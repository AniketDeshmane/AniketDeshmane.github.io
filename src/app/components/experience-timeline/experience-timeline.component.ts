import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService, ExperienceConfig, ExperiencePosition } from '../../shared/config/app-config';

interface GroupedExperience {
  company: string;
  location: string;
  branchColor: string;
  current: boolean;
  duration: string;
  positions: ExperiencePosition[];
  techStack: string[];
}

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-20 bg-background relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-6 sm:px-8">
        
        <!-- Section Header -->
        <div class="mb-14 text-left animate-fade-in">
          <span class="inline-block text-xs font-semibold tracking-widest text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full mb-4 uppercase">
            Experience
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            {{ config?.title || 'Professional Experience' }}
          </h2>
          <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mb-8">
            {{ config?.subtitle || 'A journey through my professional growth and key contributions' }}
          </p>

          <!-- Dynamic Live Stats bar -->
          <div class="flex flex-col sm:flex-row gap-6 bg-card border border-border shadow-soft rounded-3xl p-6 sm:p-7 max-w-2xl hover:border-primary/15 transition-all duration-300">
            
            <!-- Live Ticker Column -->
            <div class="flex-1 min-w-0">
              <span class="block text-[10px] sm:text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span>Live Career Counter</span>
              </span>
              
              <!-- Ticking Decimal Counter -->
              <div class="text-3xl sm:text-4xl font-black text-primary tracking-tight font-mono tabular-nums mb-1">
                {{ liveFractionalYears }} <span class="text-sm font-bold text-muted-foreground uppercase">yrs</span>
              </div>
              
              <!-- Human Readable Live Counter -->
              <div class="text-xs sm:text-sm text-foreground/80 font-semibold font-mono tabular-nums flex flex-wrap gap-x-2 gap-y-1">
                <span class="bg-secondary/60 border border-border/40 px-2 py-0.5 rounded-lg">{{ liveY }} yrs</span>
                <span class="bg-secondary/60 border border-border/40 px-2 py-0.5 rounded-lg">{{ liveM }} mos</span>
                <span class="bg-secondary/60 border border-border/40 px-2 py-0.5 rounded-lg">{{ liveD }} days</span>
                <span class="bg-secondary/60 border border-border/40 px-2 py-0.5 rounded-lg">{{ liveH }} hrs</span>
                <span class="bg-secondary/60 border border-border/40 px-2 py-0.5 rounded-lg">{{ liveMin }} mins</span>
                <span class="bg-secondary/60 border border-border/40 px-2 py-0.5 rounded-lg text-primary">{{ liveS }}s</span>
              </div>
            </div>

            <!-- Dividers -->
            <div class="hidden sm:block border-r border-border h-16 my-auto"></div>
            <div class="block sm:hidden border-b border-border w-full"></div>

            <!-- Positions Count Column -->
            <div class="flex items-center sm:flex-col sm:justify-center gap-4 sm:gap-1 text-left sm:text-center px-2">
              <div class="text-3xl sm:text-4xl font-black text-foreground">
                {{ rawPositionsCount }}
              </div>
              <div>
                <span class="block text-[10px] sm:text-xs text-muted-foreground uppercase font-bold tracking-wider">Positions</span>
                <span class="block text-[9px] text-muted-foreground/60 leading-none">{{ groupedExperiences.length }} Companies</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Timeline Container -->
        <div class="timeline-container relative pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-12">
          
          <!-- Animated Timeline Line -->
          <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-border/80">
            <!-- Traveler Chevron Arrow -->
            <div 
              class="absolute left-[1px] -translate-x-1/2 -translate-y-1/2 z-20 text-primary pointer-events-none"
              [style.top.px]="travelerTop"
              [style.opacity]="travelerOpacity"
              [style.transition]="travelerTransition">
              
              <!-- Sleek outline chevron pointing up, matching user's drawing -->
              <svg class="w-4 h-4 stroke-current fill-none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              
              <!-- Soft trail ripple ring -->
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/20 animate-ping"></span>
            </div>
          </div>
          
          <!-- Timeline Items Loop -->
          <div
            *ngFor="let group of groupedExperiences; let i = index"
            #timelineItem
            class="timeline-item relative transition-all duration-700 ease-out opacity-0 translate-y-8"
            [class.opacity-100]="visibleItems[i]"
            [class.translate-y-0]="visibleItems[i]"
            [style.transition-delay]="(i * 100) + 'ms'">
            
            <!-- Timeline Node Indicator -->
            <div class="timeline-node absolute -left-[31px] sm:-left-[39px] top-1.5 z-10 flex items-center justify-center">
              
              <!-- Radar Splash Rings (triggered when traveler reaches the node) -->
              <div 
                *ngIf="splashActive[i]" 
                class="absolute w-8 h-8 rounded-full bg-primary/20 border border-primary/40 animate-radar-splash">
              </div>
              <div 
                *ngIf="splashActive[i]" 
                class="absolute w-12 h-12 rounded-full bg-primary/10 border border-primary/20 animate-radar-splash-delayed">
              </div>

              <!-- Main Dot -->
              <div 
                class="w-4 h-4 rounded-full bg-background border-4 transition-transform duration-300 hover:scale-125"
                [style.borderColor]="group.branchColor"
                [style.boxShadow]="group.current ? '0 0 12px ' + group.branchColor : 'none'">
              </div>
            </div>

            <!-- Experience Card (grouped by company) -->
            <div 
              class="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-card-hover hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
              (mouseenter)="hoveredCardIndex = i"
              (mouseleave)="hoveredCardIndex = null">
              
              <!-- Company Header Info -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-4 mb-4">
                <div>
                  <h3 class="text-xl font-extrabold text-foreground">{{ group.company }}</h3>
                  <div class="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{{ group.location }}</span>
                  </div>
                </div>
                
                <!-- Combined Company Duration Badge -->
                <div class="self-start sm:self-center">
                  <span 
                    class="inline-block text-xs font-bold px-3 py-1 rounded-full border"
                    [style.color]="group.branchColor"
                    [style.borderColor]="group.branchColor + '33'"
                    [style.backgroundColor]="group.branchColor + '0d'">
                    {{ group.duration }}
                  </span>
                </div>
              </div>

              <!-- List of Roles inside this Company -->
              <div class="space-y-6">
                <div 
                  *ngFor="let exp of group.positions; let isFirstRole = first" 
                  [class.border-l-2]="group.positions.length > 1"
                  [class.border-dashed]="group.positions.length > 1"
                  [style.borderLeftColor]="group.branchColor + '50'"
                  [class.pl-5]="group.positions.length > 1"
                  [class.ml-2]="group.positions.length > 1"
                  [class.mt-4]="!isFirstRole && group.positions.length > 1"
                  class="relative">
                  
                  <!-- Connect dot for sub-timeline if multiple positions -->
                  <div 
                    *ngIf="group.positions.length > 1" 
                    class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border border-background"
                    [style.backgroundColor]="group.branchColor">
                  </div>
                  
                  <!-- Role Title & Sub-duration -->
                  <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 class="text-lg font-bold text-foreground leading-tight">{{ exp.position }}</h4>
                    <span class="text-xs text-muted-foreground font-semibold">
                      {{ exp.duration }}
                    </span>
                  </div>

                  <!-- Details Bullet Points -->
                  <ul class="space-y-1.5 mb-3">
                    <li 
                      *ngFor="let bullet of exp.description"
                      class="text-sm text-foreground/80 leading-relaxed flex items-start gap-2.5">
                      <span 
                        class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        [style.backgroundColor]="group.branchColor">
                      </span>
                      <span>{{ bullet }}</span>
                    </li>
                  </ul>

                  <!-- Footer pills for this role -->
                  <div class="flex flex-wrap items-center gap-3">
                    <span class="inline-flex items-center text-xs font-semibold text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                      {{ getExperienceDurationText(exp) }}
                    </span>
                    
                    <span 
                      *ngIf="exp.current"
                      class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Current Role
                    </span>
                  </div>

                </div>
              </div>

              <!-- Tech Stack Hover Row -->
              <div 
                class="tech-stack-row flex flex-wrap gap-2 pt-3 border-t border-border/40 mt-4"
                [class.tech-stack-visible]="hoveredCardIndex === i">
                <span 
                  *ngFor="let tech of group.techStack; let ti = index"
                  class="tech-badge inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full border"
                  [style.color]="group.branchColor"
                  [style.borderColor]="group.branchColor + '30'"
                  [style.backgroundColor]="group.branchColor + '0a'"
                  [style.transitionDelay]="(ti * 60) + 'ms'">
                  {{ tech }}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    @keyframes radar-splash {
      0% {
        transform: scale(0.3);
        opacity: 0.9;
      }
      100% {
        transform: scale(2.8);
        opacity: 0;
      }
    }

    .animate-radar-splash {
      animation: radar-splash 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-radar-splash-delayed {
      animation: radar-splash 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
    }

    /* Tech stack hover animation */
    .tech-stack-row {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      padding-top: 0;
      margin-top: 0;
      border-top-width: 0;
      transition: max-height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  opacity 0.3s ease,
                  padding-top 0.3s ease,
                  margin-top 0.3s ease,
                  border-top-width 0.3s ease;
    }

    .tech-stack-row.tech-stack-visible {
      max-height: 120px;
      opacity: 1;
      padding-top: 0.75rem;
      margin-top: 1rem;
      border-top-width: 1px;
    }

    .tech-badge {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .tech-stack-visible .tech-badge {
      opacity: 1;
      transform: translateY(0);
    }

    .tech-stack-visible .tech-badge:hover {
      transform: translateY(-2px);
    }
  `]
})
export class ExperienceTimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  config: ExperienceConfig | null = null;
  groupedExperiences: GroupedExperience[] = [];
  rawPositionsCount = 0;
  visibleItems: boolean[] = [];
  hoveredCardIndex: number | null = null;

  // Live Counter state
  liveFractionalYears = '0.00000000';
  liveY = 0;
  liveM = 0;
  liveD = 0;
  liveH = 0;
  liveMin = 0;
  liveS = 0;
  private timerId: any;
  private completedMs = 0;
  private activeStartDate: Date | null = null;

  // Traveler Arrow Animation state
  travelerTop = 0;
  travelerOpacity = 0;
  travelerTransition = 'none';
  splashActive: boolean[] = [];
  private isDestroyed = false;

  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  constructor(private configService: AppConfigService, private el: ElementRef) {}

  ngOnInit() {
    this.config = this.configService.getExperienceConfig();
    this.rawPositionsCount = this.config.positions.length;

    const experiences = this.config.positions.map(exp => {
      const current = !exp.endDate;
      return {
        ...exp,
        current: current,
        experienceYears: this.calculateExperienceYears(exp),
        experienceMonths: this.calculateExperienceMonths(exp)
      };
    });

    // Group consecutive jobs at the same company together
    this.groupedExperiences = this.groupExperiences(experiences);

    this.visibleItems = new Array(this.groupedExperiences.length).fill(false);
    this.splashActive = new Array(this.groupedExperiences.length).fill(false);

    // Prepare live career timing calculations
    this.calculateCompletedExperienceMs(experiences);
    this.startLiveTimer();
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx = Array.from(this.timelineItems.toArray()).findIndex(
                item => item.nativeElement === entry.target
              );
              if (idx !== -1) {
                setTimeout(() => {
                  this.visibleItems[idx] = true;
                }, idx * 80);
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      this.timelineItems.forEach(item => {
        observer.observe(item.nativeElement);
      });
    } else {
      this.visibleItems = this.visibleItems.map(() => true);
    }

    // Start traveler sequential journey animation
    setTimeout(() => {
      this.runTravelerLoop();
    }, 1200);
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private groupExperiences(positions: any[]): GroupedExperience[] {
    const grouped: GroupedExperience[] = [];
    
    positions.forEach(pos => {
      const lastGroup = grouped[grouped.length - 1];
      
      if (lastGroup && lastGroup.company === pos.company) {
        lastGroup.positions.push(pos);
        if (pos.current) lastGroup.current = true;
        // Merge tech stacks (deduplicated)
        if (pos.techStack) {
          pos.techStack.forEach((tech: string) => {
            if (!lastGroup.techStack.includes(tech)) {
              lastGroup.techStack.push(tech);
            }
          });
        }
      } else {
        grouped.push({
          company: pos.company,
          location: pos.location,
          branchColor: pos.branchColor,
          current: !!pos.current,
          duration: '',
          positions: [pos],
          techStack: pos.techStack ? [...pos.techStack] : []
        });
      }
    });

    grouped.forEach(group => {
      const oldestPos = group.positions[group.positions.length - 1];
      const newestPos = group.positions[0];
      
      const startStr = oldestPos.duration.split(' - ')[0];
      const endStr = newestPos.duration.split(' - ')[1] || 'Present';
      
      group.duration = `${startStr} - ${endStr}`;
    });

    return grouped;
  }

  calculateCompletedExperienceMs(experiences: ExperiencePosition[]) {
    this.completedMs = 0;
    experiences.forEach(exp => {
      if (exp.endDate) {
        this.completedMs += (exp.endDate.getTime() - exp.startDate.getTime());
      } else {
        this.activeStartDate = exp.startDate;
      }
    });
  }

  startLiveTimer() {
    const msInYear = 31557600000;
    const msInMonth = 2629800000;
    const msInDay = 86400000;
    const msInHour = 3600000;
    const msInMinute = 60000;
    const msInSecond = 1000;

    this.timerId = setInterval(() => {
      let activeMs = 0;
      if (this.activeStartDate) {
        activeMs = Date.now() - this.activeStartDate.getTime();
      }

      const totalMs = this.completedMs + activeMs;
      const fracYears = totalMs / msInYear;
      this.liveFractionalYears = fracYears.toFixed(8);

      let rem = totalMs;
      this.liveY = Math.floor(rem / msInYear);
      rem %= msInYear;
      this.liveM = Math.floor(rem / msInMonth);
      rem %= msInMonth;
      this.liveD = Math.floor(rem / msInDay);
      rem %= msInDay;
      this.liveH = Math.floor(rem / msInHour);
      rem %= msInHour;
      this.liveMin = Math.floor(rem / msInMinute);
      rem %= msInMinute;
      this.liveS = Math.floor(rem / msInSecond);
    }, 100);
  }

  // Traveler Arrow and Radar Splash sequential loops
  async runTravelerLoop() {
    const container = this.el.nativeElement.querySelector('.timeline-container');
    const items = this.el.nativeElement.querySelectorAll('.timeline-item');

    if (!container || items.length === 0 || this.isDestroyed) return;

    // Use offsetTop measurements: robust, constant, and immune to scroll/transforms
    const calculateTops = () => {
      return Array.from(items).map((item: any) => {
        // Node vertical center is at exactly item.offsetTop + 14px
        return item.offsetTop + 14;
      });
    };

    let nodeTops = calculateTops();

    // Re-adjust node coordinates on resize
    window.addEventListener('resize', () => {
      if (!this.isDestroyed) {
        nodeTops = calculateTops();
      }
    });

    const animateJourney = async () => {
      if (this.isDestroyed || nodeTops.length < 2) return;

      // Dynamic recalculate of tops at beginning of loop (handles initial layout changes)
      nodeTops = calculateTops();
      const oldestIdx = nodeTops.length - 1;
      
      // Step 1: Align traveler with the oldest node (at the bottom)
      this.travelerTransition = 'none';
      this.travelerTop = nodeTops[oldestIdx];
      this.travelerOpacity = 0;

      await this.sleep(300);
      if (this.isDestroyed) return;
      this.travelerOpacity = 1;

      await this.sleep(300);
      if (this.isDestroyed) return;

      // Trigger kick-off splash at bottom node
      this.triggerSplash(oldestIdx);
      await this.sleep(600);

      // Step 2: Travel sequentially upwards
      for (let j = oldestIdx - 1; j >= 0; j--) {
        if (this.isDestroyed) return;

        const distance = Math.abs(this.travelerTop - nodeTops[j]);
        // Set transition duration proportional to distance
        const travelDuration = Math.max(0.5, Math.min(1.2, distance / 250));

        this.travelerTransition = `top ${travelDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s`;
        this.travelerTop = nodeTops[j];

        // Wait for traveler to slide into the target node
        await this.sleep(travelDuration * 1000);
        if (this.isDestroyed) return;

        // Trigger radar splash rings on this milestone
        this.triggerSplash(j);
        
        // Wait at the node to let the splash animation run
        await this.sleep(600);
      }

      // Step 3: Fade out at the top of the timeline
      this.travelerOpacity = 0;
      await this.sleep(1000);

      // Repeat after 4 seconds of idle time
      if (!this.isDestroyed) {
        setTimeout(animateJourney, 4000);
      }
    };

    animateJourney();
  }

  private triggerSplash(idx: number) {
    if (this.isDestroyed) return;
    this.splashActive[idx] = true;
    setTimeout(() => {
      if (!this.isDestroyed) {
        this.splashActive[idx] = false;
      }
    }, 1000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  calculateExperienceYears(exp: ExperiencePosition): number {
    return Math.floor(this.calculateExperienceMonths(exp) / 12);
  }

  calculateExperienceMonths(exp: ExperiencePosition): number {
    const endDate = exp.endDate || new Date();
    const startDate = exp.startDate;

    const yearDiff = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();
    let totalMonths = yearDiff * 12 + monthDiff;

    totalMonths += 1;

    if (endDate.getDate() < startDate.getDate()) {
      totalMonths -= 1;
    }

    return totalMonths;
  }

  getExperienceDurationText(exp: ExperiencePosition): string {
    const totalMonths = this.calculateExperienceMonths(exp);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) {
      return `${years} yr ${months} mo`;
    } else if (years > 0) {
      return `${years} yr`;
    } else {
      return `${months} mo`;
    }
  }
}
