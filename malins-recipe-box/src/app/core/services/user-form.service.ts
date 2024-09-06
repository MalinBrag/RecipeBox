import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  private modeSubject = new BehaviorSubject<string>('register');

  mode$ = this.modeSubject.asObservable();

  setMode(mode: string): void {
    this.modeSubject.next(mode); 
  }

  getMode(): string {
    return this.modeSubject.getValue(); 
  }
}
