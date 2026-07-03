import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMail, lucidePhone } from '@ng-icons/lucide';
import { AppConfigService, ContactConfig } from '../../shared/config/app-config';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  action: () => void;
  colorClass: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ lucideMail, lucidePhone })],
  template: `
    <section id="contact" class="py-20 bg-background relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-6 sm:px-8">
        
        <!-- Section Header -->
        <div class="text-left mb-14 animate-fade-in">
          <span class="inline-block text-xs font-semibold tracking-widest text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full mb-4 uppercase">
            Contact
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            {{ config?.title || 'Get In Touch' }}
          </h2>
          <p class="text-muted-foreground text-base sm:text-lg max-w-2xl">
            {{ config?.description || "Ready to collaborate on your next project? Let's connect and discuss opportunities." }}
          </p>
        </div>

        <!-- Contact Card -->
        <div class="animate-scale-in">
          <div class="bg-card border border-border shadow-elevated rounded-3xl p-8 sm:p-10 max-w-3xl">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-foreground mb-2">Let's Work Together</h3>
              <p class="text-muted-foreground text-sm sm:text-base">
                I'm always open to discussing new opportunities, consulting work, or interesting projects.
              </p>
            </div>
            
            <!-- Info Items List -->
            <div class="space-y-4 mb-10">
              <div
                *ngFor="let contact of contactInfo; let i = index"
                class="flex items-center justify-between gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/40 hover:bg-secondary/70 transition-colors duration-250">
                
                <div class="flex items-center gap-4 min-w-0">
                  <div [class]="'p-3 rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0 ' + contact.colorClass">
                    
                    <!-- Phone/Email icons via ng-icon -->
                    <ng-icon 
                      *ngIf="contact.icon !== 'linkedin' && contact.icon !== 'github'"
                      [name]="contact.icon" 
                      size="20">
                    </ng-icon>
                    
                    <!-- SVG for LinkedIn -->
                    <svg 
                      *ngIf="contact.icon === 'linkedin'"
                      class="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>

                    <!-- SVG for GitHub -->
                    <svg 
                      *ngIf="contact.icon === 'github'"
                      class="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </div>
                  
                  <div class="min-w-0">
                    <p class="font-bold text-foreground text-sm sm:text-base leading-tight truncate">{{ contact.label }}</p>
                    <p class="text-xs sm:text-sm text-muted-foreground truncate mt-0.5">{{ contact.value }}</p>
                  </div>
                </div>

                <button
                  (click)="contact.action()"
                  class="font-bold text-primary hover:text-primary/80 text-xs sm:text-sm px-4 py-2 rounded-full hover:bg-primary/5 transition-colors duration-200">
                  Connect &rarr;
                </button>
              </div>
            </div>

            <!-- CTA Email Send Button -->
            <div class="text-left">
              <button 
                (click)="sendEmail()"
                class="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-primary/95 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                <ng-icon name="lucideMail" size="18" class="mr-2"></ng-icon>
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class ContactComponent implements OnInit {
  config: ContactConfig | null = null;
  contactInfo: ContactInfo[] = [];

  constructor(private configService: AppConfigService) {}

  ngOnInit() {
    this.config = this.configService.getContactConfig();
    this.setupContactInfo();
  }

  private setupContactInfo() {
    if (!this.config) return;

    this.contactInfo = [
      {
        icon: 'lucidePhone',
        label: this.config.info.phone.label,
        value: this.config.info.phone.value,
        action: () => this.callPhone(),
        colorClass: 'bg-blue-50 text-blue-600 border border-blue-100'
      },
      {
        icon: 'lucideMail',
        label: this.config.info.email.label,
        value: this.config.info.email.value,
        action: () => this.sendEmail(),
        colorClass: 'bg-emerald-50 text-emerald-600 border border-emerald-100'
      },
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/aniketdeshmane',
        action: () => this.openLinkedIn(),
        colorClass: 'bg-indigo-50 text-indigo-600 border border-indigo-100'
      },
      {
        icon: 'github',
        label: 'GitHub',
        value: 'github.com/AniketDeshmane',
        action: () => this.openGitHub(),
        colorClass: 'bg-gray-100 text-gray-700 border border-gray-200'
      }
    ];
  }

  callPhone(): void {
    window.open('tel:+919619663812', '_self');
  }

  sendEmail(): void {
    window.open('mailto:aniketmdeshmane@gmail.com', '_self');
  }

  openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/aniketdeshmane', '_blank');
  }

  openGitHub(): void {
    window.open('https://github.com/AniketDeshmane', '_blank');
  }
}