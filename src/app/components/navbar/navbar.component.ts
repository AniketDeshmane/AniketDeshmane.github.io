import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [ngClass]="{
        'bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm': isScrolled
      }">
      
      <!-- Scroll Progress Bar -->
      <div 
        class="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-150 ease-out z-50"
        [style.width.%]="scrollProgress">
      </div>

      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <!-- Logo / Name -->
        <a href="#" class="text-foreground font-bold text-lg tracking-tight hover:text-primary transition-colors">
          AD<span class="text-primary">.</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a *ngFor="let link of navLinks" 
             [href]="link.href"
             class="text-sm font-medium transition-colors relative py-2"
             [class.text-primary]="activeSection === link.id"
             [class.text-muted-foreground]="activeSection !== link.id"
             (click)="scrollTo(link.id, $event)">
            {{ link.label }}
            <!-- Active Indicator -->
            <span 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out"
              [class.scale-x-100]="activeSection === link.id"
              [class.scale-x-0]="activeSection !== link.id">
            </span>
          </a>
        </nav>

        <!-- Right Actions: Theme Toggle -->
        <div class="flex items-center gap-4">
          <button 
            (click)="toggleTheme()"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle Dark Mode">
            <!-- Sun Icon (shows in dark mode) -->
            <svg *ngIf="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            <!-- Moon Icon (shows in light mode) -->
            <svg *ngIf="!isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  scrollProgress = 0;
  activeSection = 'hero';
  isDarkMode = false;
  
  navLinks = [
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    if (isPlatformBrowser(this.platformId)) {
      this.updateScrollState();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateScrollState();
      this.detectActiveSection();
    }
  }

  updateScrollState() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;

    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      this.scrollProgress = (scrollPosition / docHeight) * 100;
    }
  }

  detectActiveSection() {
    const scrollPosition = window.pageYOffset + 100; // offset for navbar height
    
    // Default to hero
    let current = 'hero';
    
    // Check sections in reverse order so the lowest one in viewport wins
    for (let i = this.navLinks.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.navLinks[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        current = this.navLinks[i].id;
        break;
      }
    }
    
    // If at very top, active section should be none/hero
    if (scrollPosition < 200) {
      current = 'hero';
    }

    this.activeSection = current;
  }

  scrollTo(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
