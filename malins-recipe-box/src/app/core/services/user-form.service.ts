import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  // Observable to track the current mode of the form (for example, 'register' or 'login')
  private modeSubject = new BehaviorSubject<string>('register');

  // Observable to track the mode of the form
  mode$ = this.modeSubject.asObservable();

  /**
   * Set the current mode
   * @param mode - The mode
   */
  setMode(mode: string): void {
    this.modeSubject.next(mode); 
  }

  /**
   * Get the current mode
   * @returns The mode
   */
  getMode(): string {
    return this.modeSubject.getValue(); 
  }
}
