import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private _isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this._isDarkMode.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initTheme();
  }

  private initTheme() {
    if (typeof window === 'undefined') return;

    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme) {
      this.setDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(prefersDark);
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.setDarkMode(e.matches);
      }
    });
  }

  public toggleTheme() {
    this.setDarkMode(!this._isDarkMode.value);
  }

  private setDarkMode(isDark: boolean) {
    this._isDarkMode.next(isDark);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
        const htmlElement = this.document.documentElement;
        const bodyElement = this.document.body;
        
        if (isDark) {
          htmlElement.classList.add('dark');
          if (bodyElement) bodyElement.classList.add('dark');
        } else {
          htmlElement.classList.remove('dark');
          if (bodyElement) bodyElement.classList.remove('dark');
        }
      } catch (e) {
        console.error('Theme toggle failed', e);
      }
    }
  }

  public get isDarkMode(): boolean {
    return this._isDarkMode.value;
  }
}
