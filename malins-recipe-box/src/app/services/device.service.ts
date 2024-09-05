import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
 
  private isMobileSujbect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkIfMobile());

  constructor() {
    fromEvent(window, 'resize')
    .pipe(
      debounceTime(200),
      map(() => this.checkIfMobile())
    )
    .subscribe(isMobile => {
      this.isMobileSujbect.next(isMobile);
    });
  }
  

  private checkIfMobile(): boolean {
    return window.innerWidth <= 768;
  }

  isMobile(): Observable<boolean> {
    return this.isMobileSujbect.asObservable();
  }

}
