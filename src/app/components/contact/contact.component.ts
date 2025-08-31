import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMail, lucidePhone, lucideMapPin } from '@ng-icons/lucide';
import { CardComponent } from '../ui/card/card.component';
import { ButtonComponent } from '../ui/button/button.component';

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
  viewProviders: [provideIcons({ lucideMail, lucidePhone, lucideMapPin })],
  template: `
    <section id="contact" class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-skill-accent bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's connect and discuss opportunities.
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <app-card class="bg-card-gradient border-border">
            <div class="p-6">
              <div class="text-center mb-6">
                <h3 class="text-2xl text-foreground font-semibold mb-2">
                  Let's Work Together
                </h3>
                <p class="text-lg text-muted-foreground">
                  I'm always open to discussing new opportunities and interesting projects.
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div
                  *ngFor="let contact of contactInfo; let i = index"
                  class="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200 animate-fade-in"
                  [style.animation-delay.s]="i * 0.1">
                  
                  <div [class]="'p-3 rounded-full bg-gradient-to-r text-white ' + contact.color">
                    <ng-icon 
                      *ngIf="contact.icon !== 'linkedin'"
                      [name]="contact.icon" 
                      size="24">
                    </ng-icon>
                    <svg 
                      *ngIf="contact.icon === 'linkedin'"
                      class="w-6 h-6" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-foreground">{{ contact.label }}</p>
                    <p class="text-sm text-muted-foreground">{{ contact.value }}</p>
                  </div>
                  <app-button
                    variant="ghost"
                    size="sm"
                    (click)="contact.action()"
                    class="hover:bg-primary/10 hover:text-primary">
                    Connect
                  </app-button>
                </div>
              </div>

              <div class="text-center">
                <app-button 
                  size="lg"
                  (click)="sendEmail()"
                  class="bg-primary hover:bg-primary/90 animate-glow">
                  <ng-icon name="lucideMail" size="20" class="mr-2"></ng-icon>
                  Send Email
                </app-button>
              </div>
            </div>
          </app-card>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ContactComponent {
  contactInfo: ContactInfo[] = [
    {
      icon: 'lucidePhone',
      label: 'Phone',
      value: '+91 9619663812',
      action: () => window.open('tel:+919619663812'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'lucideMail',
      label: 'Email', 
      value: 'aniketmdeshmane@gmail.com',
      action: () => window.open('mailto:aniketmdeshmane@gmail.com'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/aniketdeshmane',
      action: () => window.open('https://www.linkedin.com/in/aniketdeshmane', '_blank'),
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: 'lucideMapPin',
      label: 'Location',
      value: 'Panvel, Maharashtra, India',
      action: () => window.open('https://maps.google.com/?q=Panvel,Maharashtra,India', '_blank'),
      color: 'from-red-500 to-orange-500'
    }
  ];

  sendEmail(): void {
    window.open('mailto:aniketmdeshmane@gmail.com');
  }
}