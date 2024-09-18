import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
 
  // BehaviorSubject to track if the device is mobile
  private isMobileSujbect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkIfMobile());

  constructor() {
    // Listen for window resize events and update mobile status
    fromEvent(window, 'resize')
    .pipe(
      debounceTime(200),
      map(() => this.checkIfMobile())
    )
    .subscribe(isMobile => {
      this.isMobileSujbect.next(isMobile);
    });
  }
  

  /**
   * Boolean check to determine if the device is mobile
   * @returns True if the device is less than 768px wide, false otherwise
   */
  private checkIfMobile(): boolean {
    return window.innerWidth <= 768;
  }

  /**
   * Observable to track if the device is mobile
   * @returns An observable that emits true if the device is mobile, false otherwise
   */
  isMobile(): Observable<boolean> {
    return this.isMobileSujbect.asObservable();
  }

}
