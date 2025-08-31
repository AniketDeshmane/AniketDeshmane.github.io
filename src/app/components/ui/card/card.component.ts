import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() class = '';

  get computedClass(): string {
    return cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      this.class
    );
  }
}