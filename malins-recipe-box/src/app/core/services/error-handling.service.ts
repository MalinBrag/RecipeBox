import { Injectable } from '@angular/core';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  handleError<T>(operation = 'operation', result?: T ) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.log(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));  
    };
  } 

  private log(message: string) {
    window.alert(message);
  }
}
