import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMail, lucidePhone } from '@ng-icons/lucide';
import { CardComponent } from '../ui/card/card.component';
import { ButtonComponent } from '../ui/button/button.component';
import { AppConfigService, ContactConfig } from '../../shared/config/app-config';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  action: () => void;
  color: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, NgIconComponent],
  viewProviders: [provideIcons({ lucideMail, lucidePhone })],
     template: `
     <section id="contact" class="py-12 sm:py-16 lg:py-20 bg-background">
       <div class="container mx-auto px-4 sm:px-6 lg:px-8">
         <div class="text-center mb-12 sm:mb-16">
           <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent">
             {{ config?.title || 'Get In Touch' }}
           </h2>
           <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
             {{ getDescription() }}
           </p>
         </div>

         <div class="max-w-4xl mx-auto">
           <app-card class="bg-card-gradient border-border">
             <div class="p-4 sm:p-6">
               <div class="text-center mb-6">
                 <h3 class="text-xl sm:text-2xl text-foreground font-semibold mb-2">
                   Let's Work Together
                 </h3>
                 <p class="text-base sm:text-lg text-muted-foreground">
                   I'm always open to discussing new opportunities and interesting projects.
                 </p>
               </div>
               
               <div class="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
                 <div
                   *ngFor="let contact of contactInfo; let i = index"
                   class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200 animate-fade-in"
                   [style.animation-delay.s]="i * 0.1">
                   
                   <div [class]="'p-2 sm:p-3 rounded-full bg-gradient-to-r text-white flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ' + contact.color">
                     <ng-icon 
                       *ngIf="contact.icon !== 'linkedin' && contact.icon !== 'github'"
                       [name]="contact.icon" 
                       size="20" class="sm:text-2xl">
                     </ng-icon>
                     <svg 
                       *ngIf="contact.icon === 'linkedin'"
                       class="w-5 h-5 sm:w-6 sm:h-6" 
                       fill="currentColor" 
                       viewBox="0 0 24 24" 
                       xmlns="http://www.w3.org/2000/svg">
                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                     </svg>
                     <svg 
                       *ngIf="contact.icon === 'github'"
                       class="w-5 h-5 sm:w-6 sm:h-6" 
                       fill="currentColor" 
                       viewBox="0 0 24 24" 
                       xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                     </svg>
                   </div>
                   <div class="flex-1 min-w-0">
                     <p class="font-semibold text-foreground text-sm sm:text-base truncate">{{ contact.label }}</p>
                     <p class="text-xs sm:text-sm text-muted-foreground truncate">{{ contact.value }}</p>
                   </div>
                   <app-button
                     variant="ghost"
                     size="sm"
                     (click)="contact.action()"
                     class="hover:bg-primary/10 hover:text-primary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                     Connect
                   </app-button>
                 </div>
               </div>

               <div class="text-center">
                 <app-button 
                   size="lg"
                   (click)="sendEmail()"
                   class="bg-primary hover:bg-primary/90 animate-glow w-full sm:w-auto">
                   <ng-icon name="lucideMail" size="18" class="sm:text-xl mr-2"></ng-icon>
                   Send Email
                 </app-button>
               </div>
             </div>
           </app-card>
         </div>
       </div>
     </section>
   `,
  styles: [`
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
export class ContactComponent implements OnInit {
  config: ContactConfig | null = null;
  contactInfo: ContactInfo[] = [];

  constructor(private configService: AppConfigService) {}

  ngOnInit() {
    console.log('🔄 ContactComponent: ngOnInit started');
    this.config = this.configService.getContactConfig();
    console.log('📋 Contact config loaded:', this.config);
    this.setupContactInfo();
    console.log('✅ ContactComponent: ngOnInit completed');
  }

  private setupContactInfo() {
    if (!this.config) return;

    this.contactInfo = [
      {
        icon: 'lucidePhone',
        label: this.config.info.phone.label,
        value: this.config.info.phone.value,
        action: () => this.callPhone(),
        color: 'from-blue-500 to-blue-600'
      },
      {
        icon: 'lucideMail',
        label: this.config.info.email.label,
        value: this.config.info.email.value,
        action: () => this.sendEmail(),
        color: 'from-green-500 to-green-600'
      },
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/aniketdeshmane',
        action: () => this.openLinkedIn(),
        color: 'from-blue-600 to-blue-700'
      },
      {
        icon: 'github',
        label: 'GitHub',
        value: 'github.com/AniketDeshmane',
        action: () => this.openGitHub(),
        color: 'from-gray-600 to-gray-700'
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

  getDescription(): string {
    console.log('📝 getDescription called, config:', this.config);
    if (this.config?.description) {
      console.log('✅ Using config description:', this.config.description);
      return this.config.description;
    }
    console.log('⚠️ Using fallback description');
    return 'Ready to collaborate on your next project? Let\'s connect and discuss opportunities.';
  }
}