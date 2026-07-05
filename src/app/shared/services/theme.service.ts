import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private _isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this._isDarkMode.asObservable();

  constructor() {
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
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
      
      const htmlElement = document.documentElement;
      if (isDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }

  public get isDarkMode(): boolean {
    return this._isDarkMode.value;
  }
}
