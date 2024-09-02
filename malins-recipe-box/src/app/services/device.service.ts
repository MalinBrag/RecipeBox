/*import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  isMobile = signal(false);
  private resizeListener: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize();
      this.listenToResize();
    }
  }
  

  private checkWindowSize(): void {  
    this.isMobile.set(window.innerWidth <= 768);
  }

  private listenToResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeListener = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.checkWindowSize();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener.unsubscribe();
    }
  }

}*/
