import { Injectable } from '@angular/core';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  /**
   * Handle Http operation errors
   * @param operation - The name of the operation that failed
   * @param result - The optional value to return as the observable result
   * @returns A function that handles errors and returns an observable result
   */
  handleError<T>(operation = 'operation', result?: T ) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.log(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));  
    };
  } 

  /**
   * Log an error message
   * @param message - The message to log
   */
  private log(message: string) {
    window.alert(message);
  }
}
