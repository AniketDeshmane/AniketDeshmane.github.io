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
  lucideArrowLeft
} from '@ng-icons/lucide';
import { CardComponent } from '../ui/card/card.component';
import { ButtonComponent } from '../ui/button/button.component';
import { AppConfigService, SkillsConfig } from '../../shared/config/app-config';

interface Skill {
  category: string;
  icon: string;
  skills: string[];
  color: string;
  description: string;
  experience: string;
  highlights: string[];
}

@Component({
  selector: 'app-skill-cards',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, NgIconComponent],
  viewProviders: [provideIcons({ 
    lucideCode, 
    lucideCloud, 
    lucideDatabase, 
    lucideServer, 
    lucideSmartphone, 
    lucideBarChart3,
    lucideMessageSquare,
    lucideSearch,
    lucideArrowLeft
  })],
  template: `
    <section class="py-12 sm:py-16 lg:py-20 bg-muted/20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent">
            {{ config?.title || 'Technical Skills' }}
          </h2>
          <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            {{ config?.subtitle || 'Click on any card to explore my expertise in different technologies' }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          <div
            *ngFor="let skill of skillCategories; let i = index"
            class="h-64 sm:h-72 lg:h-80 perspective-1000 animate-fade-in"
            [style.animation-delay.s]="i * 0.1">
            
            <div
              class="relative w-full h-full cursor-pointer"
              (click)="handleCardClick(i)">
              
              <!-- Front of card -->
              <app-card 
                [class]="'absolute inset-0 bg-card-gradient border-border hover:border-primary/50 transition-all duration-300 ' + 
                  (flippedCards.has(i) ? 'opacity-0 pointer-events-none' : 'opacity-100')">
                <div class="flex flex-col items-center justify-center h-full text-center p-4 sm:p-6">
                  <div [class]="'mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-gradient-to-r text-white flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ' + skill.color">
                    <ng-icon [name]="skill.icon" size="24" class="sm:text-3xl"></ng-icon>
                  </div>
                  <h3 class="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {{ skill.category }}
                  </h3>
                  <p class="text-xs sm:text-sm text-muted-foreground">
                    Click to explore skills
                  </p>
                </div>
              </app-card>

              <!-- Back of card -->
              <app-card 
                [class]="'absolute inset-0 bg-card-gradient border-primary/50 transition-all duration-300 ' + 
                  (flippedCards.has(i) ? 'opacity-100' : 'opacity-0 pointer-events-none')">
                <div class="flex flex-col justify-center h-full p-4 sm:p-6">
                  <div [class]="'mb-2 sm:mb-3 p-2 rounded-full bg-gradient-to-r text-white flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto ' + skill.color">
                    <ng-icon [name]="skill.icon" size="20" class="sm:text-2xl"></ng-icon>
                  </div>
                  <h3 class="text-base sm:text-lg font-bold text-center text-foreground mb-3 sm:mb-4">
                    {{ skill.category }}
                  </h3>
                  
                  <ul class="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                    <li 
                      *ngFor="let skillName of skill.skills"
                      class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                      <div class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-skill-accent rounded-full mt-1 sm:mt-1.5 flex-shrink-0"></div>
                      <span class="break-words">{{ skillName }}</span>
                    </li>
                  </ul>
                  
                  <div class="mt-auto text-center">
                    <button 
                      class="text-xs text-primary hover:text-primary/80 transition-colors flex items-center mx-auto p-2"
                      (click)="$event.stopPropagation(); handleCardClick(i)">
                      <ng-icon name="lucideArrowLeft" size="12" class="sm:text-sm mr-1"></ng-icon>
                      Back
                    </button>
                  </div>
                </div>
              </app-card>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .perspective-1000 {
      perspective: 1000px;
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
export class SkillCardsComponent implements OnInit {
  config: SkillsConfig | null = null;
  skillCategories: Skill[] = [];
  flippedCards = new Set<number>();

  constructor(private configService: AppConfigService) {}

  ngOnInit() {
    this.config = this.configService.getSkillsConfig();
    this.setupSkillCategories();
  }

  private setupSkillCategories() {
    if (!this.config) return;

    this.skillCategories = this.config.categories.map(category => ({
      category: category.name,
      icon: this.getIconForCategory(category.name),
      skills: category.skills.map(skill => skill.name),
      color: this.getColorForCategory(category.name),
      description: `Expertise in ${category.name.toLowerCase()} technologies`,
      experience: '4+ years',
      highlights: category.skills.map(skill => `${skill.name} (${skill.level}%)`)
    }));
  }

  private getIconForCategory(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Frontend': 'lucideSmartphone',
      'Backend': 'lucideServer',
      'Database': 'lucideDatabase',
      'Tools & Others': 'lucideCode',
      'Cloud & DevOps': 'lucideCloud',
      'Analytics & Monitoring': 'lucideBarChart3',
      'Integration': 'lucideMessageSquare',
      'Security': 'lucideSearch'
    };
    return iconMap[category] || 'lucideCode';
  }

  private getColorForCategory(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Frontend': 'from-blue-500 to-cyan-500',
      'Backend': 'from-green-500 to-emerald-500',
      'Database': 'from-purple-500 to-pink-500',
      'Tools & Others': 'from-orange-500 to-red-500',
      'Cloud & DevOps': 'from-indigo-500 to-blue-500',
      'Analytics & Monitoring': 'from-teal-500 to-green-500',
      'Integration': 'from-yellow-500 to-orange-500',
      'Security': 'from-red-500 to-pink-500'
    };
    return colorMap[category] || 'from-gray-500 to-gray-600';
  }

  handleCardClick(index: number): void {
    if (this.flippedCards.has(index)) {
      this.flippedCards.delete(index);
    } else {
      this.flippedCards.add(index);
    }
  }
}