import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ExperienceTimelineComponent } from '../../components/experience-timeline/experience-timeline.component';
import { SkillCardsComponent } from '../../components/skill-cards/skill-cards.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeroComponent,
    ExperienceTimelineComponent,
    SkillCardsComponent,
    ContactComponent,
    NavbarComponent,
    CommonModule
  ],
  template: `
    <div class="min-h-screen bg-background relative">
      <app-navbar></app-navbar>
      
      <main>
        <app-hero></app-hero>
        <app-experience-timeline></app-experience-timeline>
        <app-skill-cards></app-skill-cards>
        <app-contact></app-contact>
      </main>

      <!-- Floating Action Buttons -->
      <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        <!-- Back to Top -->
        <button 
          *ngIf="showBackToTop"
          (click)="scrollToTop()"
          class="w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm text-foreground border border-border shadow-soft flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 pointer-events-auto animate-fade-in"
          aria-label="Back to top">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>

        <!-- Resume Download -->
        <a 
          href="/assets/Resume.docx" 
          target="_blank"
          download
          class="group flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-elevated hover:shadow-glow hover:-translate-y-1 transition-all duration-300 pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:animate-bounce">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" x2="12" y1="15" y2="3"/>
          </svg>
          <span class="font-semibold text-sm tracking-wide">Resume</span>
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class IndexComponent {
  showBackToTop = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showBackToTop = window.pageYOffset > 500;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}