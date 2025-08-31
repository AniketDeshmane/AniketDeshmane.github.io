import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  lucideChevronDown, 
  lucideMail, 
  lucidePhone,
  lucideGithub
} from '@ng-icons/lucide';
import { ButtonComponent } from '../ui/button/button.component';
import { AppConfigService, HeroConfig } from '../../shared/config/app-config';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, NgIconComponent],
  viewProviders: [provideIcons({ lucideChevronDown, lucideMail, lucidePhone, lucideGithub })],
  template: `
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-hero-gradient opacity-10"></div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="max-w-4xl mx-auto animate-fade-in">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent px-4">
            {{ config?.title || 'Aniket Deshmane' }}
          </h1>
          <p class="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 sm:mb-4 px-4">
            {{ config?.subtitle || 'Software Engineer | C# | Angular | AWS' }}
          </p>
          <p class="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            {{ config?.description || 'Passionate software engineer with expertise in full-stack development, cloud technologies, and creating scalable solutions that drive business growth.' }}
          </p>
          
          <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <app-button 
              variant="default" 
              size="lg"
              (click)="scrollToSection('experience')"
              class="bg-primary hover:bg-primary/90 animate-glow cursor-pointer w-full sm:w-auto">
              {{ config?.cta?.primary || 'View Experience' }}
            </app-button>
            <app-button 
              variant="outline" 
              size="lg"
              (click)="scrollToSection('contact')"
              class="border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer w-full sm:w-auto">
              {{ config?.cta?.secondary || 'Get In Touch' }}
            </app-button>
          </div>

          <div class="flex justify-center gap-4 sm:gap-6">
            <a 
              href="tel:+919619663812" 
              class="text-muted-foreground hover:text-primary transition-colors duration-200 p-2"
              aria-label="Phone">
              <ng-icon name="lucidePhone" size="20" class="sm:text-2xl"></ng-icon>
            </a>
            <a 
              href="mailto:aniketmdeshmane@gmail.com" 
              class="text-muted-foreground hover:text-primary transition-colors duration-200 p-2"
              aria-label="Email">
              <ng-icon name="lucideMail" size="20" class="sm:text-2xl"></ng-icon>
            </a>
            <a 
              href="https://www.linkedin.com/in/aniketdeshmane" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-primary transition-colors duration-200 p-2"
              aria-label="LinkedIn">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ng-icon 
          name="lucideChevronDown" 
          size="24" class="sm:text-3xl"
          class="text-primary cursor-pointer" 
          (click)="scrollToSection('experience')">
        </ng-icon>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent implements OnInit {
  config: HeroConfig | null = null;

  constructor(private configService: AppConfigService) {}

  ngOnInit() {
    this.config = this.configService.getHeroConfig();
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}