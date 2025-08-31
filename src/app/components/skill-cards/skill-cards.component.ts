import { Component } from '@angular/core';
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
  lucideSearch
} from '@ng-icons/lucide';
import { CardComponent } from '../ui/card/card.component';

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
  imports: [CommonModule, CardComponent, NgIconComponent],
  viewProviders: [provideIcons({ 
    lucideCode, 
    lucideCloud, 
    lucideDatabase, 
    lucideServer, 
    lucideSmartphone, 
    lucideBarChart3,
    lucideMessageSquare,
    lucideSearch
  })],
  template: `
    <section class="py-20 bg-muted/20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on any card to explore my expertise in different technologies
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            *ngFor="let skill of skillCategories; let i = index"
            class="h-80 perspective-1000 animate-fade-in"
            [style.animation-delay.s]="i * 0.1">
            
            <div
              [class]="'relative w-full h-full cursor-pointer transition-transform duration-700 transform-style-preserve-3d ' + 
                (flippedCards.has(i) ? 'rotate-y-180' : '')"
              (click)="handleCardClick(i)">
              
              <!-- Front of card -->
              <app-card class="absolute inset-0 backface-hidden bg-card-gradient border-border hover:border-primary/50 transition-all duration-300">
                <div class="flex flex-col items-center justify-center h-full text-center p-6">
                  <div [class]="'mb-4 p-4 rounded-full bg-gradient-to-r text-white ' + skill.color">
                    <ng-icon [name]="skill.icon" size="32"></ng-icon>
                  </div>
                  <h3 class="text-xl font-bold text-foreground mb-2">
                    {{ skill.category }}
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    Click to explore skills
                  </p>
                </div>
              </app-card>

              <!-- Back of card -->
              <app-card class="absolute inset-0 backface-hidden rotate-y-180 bg-card-gradient border-primary/50">
                <div class="flex flex-col justify-center h-full p-6 overflow-y-auto">
                  <div [class]="'mb-3 p-2 rounded-full bg-gradient-to-r text-white w-fit mx-auto ' + skill.color">
                    <ng-icon [name]="skill.icon" size="24"></ng-icon>
                  </div>
                  <h3 class="text-lg font-bold text-center text-foreground mb-2">
                    {{ skill.category }}
                  </h3>
                  <p class="text-xs text-primary font-medium text-center mb-2">
                    {{ skill.experience }} Experience
                  </p>
                  <p class="text-xs text-muted-foreground text-center mb-4 leading-relaxed">
                    {{ skill.description }}
                  </p>
                  
                  <div class="space-y-3">
                    <h4 class="text-sm font-semibold text-foreground">Key Highlights:</h4>
                    <ul class="space-y-1.5">
                      <li 
                        *ngFor="let highlight of skill.highlights"
                        class="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <div class="w-1 h-1 bg-skill-accent rounded-full mt-1.5 flex-shrink-0"></div>
                        {{ highlight }}
                      </li>
                    </ul>
                  </div>
                  
                  <div class="mt-4 pt-3 border-t border-border/50">
                    <h4 class="text-sm font-semibold text-foreground mb-2">Technologies:</h4>
                    <div class="flex flex-wrap gap-1">
                      <span 
                        *ngFor="let skillName of skill.skills"
                        class="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-full">
                        {{ skillName }}
                      </span>
                    </div>
                  </div>
                </div>
              </app-card>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class SkillCardsComponent {
  flippedCards = new Set<number>();

  skillCategories: Skill[] = [
    {
      category: "Frontend",
      icon: "lucideCode",
      skills: ["Angular", "Angular 12", "HTML/CSS", "TypeScript", "JavaScript"],
      color: "from-blue-500 to-cyan-500",
      description: "Modern frontend development with focus on user experience and performance",
      experience: "4+ years",
      highlights: [
        "Built responsive UIs with Angular 12+",
        "Implemented complex state management",
        "Optimized bundle sizes and loading times",
        "Created reusable component libraries"
      ]
    },
    {
      category: "Backend", 
      icon: "lucideServer",
      skills: ["C#", ".NET 6", "ASP.NET", "ASP.NET MVC 5", "WebAPI", "Webforms"],
      color: "from-green-500 to-emerald-500",
      description: "Robust backend development with Microsoft technologies",
      experience: "4+ years",
      highlights: [
        "Developed RESTful APIs with .NET 6",
        "Implemented MVC architecture patterns",
        "Database design and optimization",
        "Microservices architecture experience"
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: "lucideCloud",
      skills: ["AWS", "Amazon SQS", "Amazon SNS", "Docker"],
      color: "from-orange-500 to-red-500",
      description: "Cloud infrastructure and deployment automation",
      experience: "3+ years",
      highlights: [
        "AWS services integration and management",
        "Containerized applications with Docker",
        "CI/CD pipeline implementation",
        "Infrastructure as Code practices"
      ]
    },
    {
      category: "Analytics & Monitoring",
      icon: "lucideBarChart3",
      skills: ["Splunk", "BI/BA Dashboard", "Performance Monitoring"],
      color: "from-purple-500 to-pink-500",
      description: "Data-driven insights and system monitoring",
      experience: "2+ years",
      highlights: [
        "Created BI dashboards for stakeholders",
        "Performance monitoring and optimization",
        "Log analysis and troubleshooting",
        "Business intelligence reporting"
      ]
    },
    {
      category: "Integration",
      icon: "lucideMessageSquare",
      skills: ["WeChat API", "REST APIs", "Third-party Integrations"],
      color: "from-indigo-500 to-blue-500",
      description: "Seamless system integration and API development",
      experience: "3+ years",
      highlights: [
        "Third-party API integrations",
        "WeChat API for Chinese market",
        "API security and rate limiting",
        "Real-time data synchronization"
      ]
    },
    {
      category: "Security",
      icon: "lucideSearch",
      skills: ["Authentication", "Rate Limiting", "Blacklisting", "Backend Security"],
      color: "from-red-500 to-orange-500",
      description: "Comprehensive security implementation and protection",
      experience: "3+ years",
      highlights: [
        "JWT authentication systems",
        "Rate limiting and DDoS protection",
        "Security audit and compliance",
        "Secure API development practices"
      ]
    }
  ];

  handleCardClick(index: number): void {
    if (this.flippedCards.has(index)) {
      this.flippedCards.delete(index);
    } else {
      this.flippedCards.add(index);
    }
  }
}