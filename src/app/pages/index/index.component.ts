import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ExperienceTimelineComponent } from '../../components/experience-timeline/experience-timeline.component';
import { SkillCardsComponent } from '../../components/skill-cards/skill-cards.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { CustomCursorComponent } from '../../components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeroComponent,
    ExperienceTimelineComponent,
    SkillCardsComponent,
    ContactComponent,
    CustomCursorComponent
  ],
  template: `
    <div class="min-h-screen bg-background">
      <app-custom-cursor></app-custom-cursor>
      <app-hero></app-hero>
      <app-experience-timeline></app-experience-timeline>
      <app-skill-cards></app-skill-cards>
      <app-contact></app-contact>
    </div>
  `,
  styles: []
})
export class IndexComponent {}