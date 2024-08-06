import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InactivityService implements OnDestroy {
  private inactivityTime = 30 * 60 * 1000;
  private timeoutId: any;
  public inactivity$ = new Subject<void>();

  constructor() {
    this.resetTimeout();
    this.setupActivityListeners();
  }

  setupActivityListeners() {
    window.addEventListener('mousemove', () => this.resetTimeout());
    window.addEventListener('mousedown', () => this.resetTimeout());
    window.addEventListener('keypress', () => this.resetTimeout());
    window.addEventListener('touchstart', () => this.resetTimeout());
    window.addEventListener('scroll', () => this.resetTimeout());
  }

  resetTimeout() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.inactivity$.next(), this.inactivityTime);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
    window.removeEventListener('mousemove', () => this.resetTimeout());
    window.removeEventListener('mousedown', () => this.resetTimeout());
    window.removeEventListener('keypress', () => this.resetTimeout());
    window.removeEventListener('touchstart', () => this.resetTimeout());
    window.removeEventListener('scroll', () => this.resetTimeout());
  }
}
