import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/ui/button/button.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center px-4">
      <div class="text-center space-y-6">
        <h1 class="text-9xl font-bold text-primary">404</h1>
        <h2 class="text-3xl font-semibold text-foreground">Page Not Found</h2>
        <p class="text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <app-button 
          routerLink="/" 
          variant="default"
          size="lg"
          class="mt-8">
          Back to Home
        </app-button>
      </div>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {}