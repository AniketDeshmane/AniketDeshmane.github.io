import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="isVisible">
      <!-- Main cursor dot -->
      <div
        class="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-50 pointer-events-none transition-transform duration-100 ease-out"
        [style.transform]="'translate3d(' + (position.x - 4) + 'px, ' + (position.y - 4) + 'px, 0) scale(' + (isHovering ? 0.5 : 1) + ')'">
      </div>
      <!-- Glowing circle -->
      <div
        class="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full z-40 pointer-events-none transition-all duration-300 ease-out"
        [style.transform]="'translate3d(' + (position.x - 16) + 'px, ' + (position.y - 16) + 'px, 0) scale(' + (isHovering ? 1.5 : 1) + ')'"
        [style.box-shadow]="'0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.1)'"
        [style.background]="isHovering ? 'hsl(var(--primary) / 0.1)' : 'transparent'">
      </div>
    </ng-container>
  `,
  styles: []
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  position = { x: 0, y: 0 };
  isHovering = false;
  isVisible = false;
  private interactiveElements: NodeListOf<Element> | null = null;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.position = { x: e.clientX, y: e.clientY };
    this.isVisible = true;
  }

  @HostListener('document:mouseout')
  onMouseOut(): void {
    this.isVisible = false;
  }

  @HostListener('document:mouseenter')
  onMouseEnter(): void {
    this.isVisible = true;
  }

  ngOnInit(): void {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add hover effects for interactive elements
    setTimeout(() => {
      this.interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
      this.interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', this.handleMouseEnter);
        el.addEventListener('mouseleave', this.handleMouseLeave);
      });
    }, 100);
  }

  ngOnDestroy(): void {
    // Restore default cursor
    document.body.style.cursor = 'auto';

    // Remove event listeners
    if (this.interactiveElements) {
      this.interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', this.handleMouseEnter);
        el.removeEventListener('mouseleave', this.handleMouseLeave);
      });
    }
  }

  private handleMouseEnter = (): void => {
    this.isHovering = true;
  }

  private handleMouseLeave = (): void => {
    this.isHovering = false;
  }
}