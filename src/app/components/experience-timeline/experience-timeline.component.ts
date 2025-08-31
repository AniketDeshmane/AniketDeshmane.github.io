import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBuilding, lucideCalendar, lucideMapPin } from '@ng-icons/lucide';
import { CardComponent } from '../ui/card/card.component';
import { BadgeComponent } from '../ui/badge/badge.component';

interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  current?: boolean;
}

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, NgIconComponent],
  viewProviders: [provideIcons({ lucideBuilding, lucideCalendar, lucideMapPin })],
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

        <div class="max-w-4xl mx-auto relative">
          <!-- Timeline line -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-timeline-line"></div>
          
          <div class="space-y-12">
            <div 
              *ngFor="let exp of experiences; let i = index"
              class="relative flex items-start gap-8 animate-fade-in"
              [style.animation-delay.s]="i * 0.2">
              
              <!-- Timeline dot -->
              <div [class]="'relative z-10 w-4 h-4 rounded-full border-4 ' + 
                (exp.current ? 'bg-primary border-primary animate-glow' : 'bg-card border-timeline-line')">
              </div>
              
              <app-card class="flex-1 bg-card-gradient border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div class="p-6">
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <h3 class="text-xl text-foreground flex items-center gap-2 font-semibold">
                      <ng-icon name="lucideBuilding" size="20" class="text-primary"></ng-icon>
                      {{ exp.company }}
                    </h3>
                    <app-badge 
                      *ngIf="exp.current" 
                      class="bg-skill-accent text-black w-fit">
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
    </section>
  `,
  styles: []
})
export class ExperienceTimelineComponent {
  experiences: Experience[] = [
    {
      company: "OneRock IT Services Private Limited",
      position: "Software Engineer",
      duration: "December 2024 - Present",
      location: "Mumbai, Maharashtra, India",
      description: ["Working as a consultant for BX"],
      current: true
    },
    {
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
      ]
    },
    {
      company: "Tata Consultancy Services",
      position: "Assistant System Engineer",
      duration: "April 2021 - May 2023",
      location: "India",
      description: [
        "Enhancement/Development of WebApps using ASP.Net",
        "WebAPI development",
        "ASP.NET MVC 5 implementation",
        "Webforms development"
      ]
    },
    {
      company: "Exaosis",
      position: ".NET Developer",
      duration: "January 2021 - February 2021",
      location: "India", 
      description: ["Worked on the Frontend development"]
    }
  ];
}