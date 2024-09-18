import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, of } from 'rxjs';
import { LoginData } from '../../../shared/models/login-data.model';
import { LoginResponse } from '../../../shared/models/login-response.model';
import { User } from '../../../shared/models/user.model';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8000/api";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  
  //Observable to track login status
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { 
    this.checkLoginStatus();
  }

  /**
   * Set the token in the session storage
   * @param token - The token
   */
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  /**
   * Get the token from the session storage
   * @returns The token
   */
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  /**
   * Set the user ID in the session storage
   * @param userId - The user ID
   */
  setUserUserId(userId: string): void {
    sessionStorage.setItem('userId', userId);
  }

  /**
   * Get the user ID from the session storage
   * @returns The user ID
   */
  getUserId(): string {
    return sessionStorage.getItem('userId')!;
  }
  
  /**
   * Register a new user account in backend
   * @param user - The user data
   * @returns A login response with the token and user data
   */
  register(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/register`, user).pipe(
      tap((response: LoginResponse) => {
        const token = response.token;
        const userId = response.user?.id;

        this.setToken(token);

        if (userId) {
          this.setUserUserId(userId);
        }
      }),
      catchError(this.errorHandlingService.handleError<any>('register'))
    );
  }

  /**
   * Login a user in backend
   * @param data - The login data
   * @returns A login response with the token and user data
   */
  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, data).pipe(
      tap((response: LoginResponse) => {
        const token = response.token;
        const userId = response.user?.id;

        this.setToken(token);
        if (userId) {
          this.setUserUserId(userId);
        }
      }),
      catchError(this.errorHandlingService.handleError<any>('login'))
    );
  }

  /**
   * Logout the user and clear session storage
   */
  logout(): void {
    this.http.post(`${this.url}/logout`, {}).pipe(
      tap((response: any) => {
        sessionStorage.removeItem('token');
        this.isLoggedInSubject.next(false);
        sessionStorage.clear();
      }),
      catchError(this.errorHandlingService.handleError<any>('logout'))
    ). subscribe();
  }

  /**
   * Get user data from the backend
   * @param id - The user ID
   * @returns A user object
   */
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/getuser/${id}`).pipe(
      catchError(this.errorHandlingService.handleError<User>('getUser'))
    );
  }

  //not complete
  edit(id: string, userData: User): Observable<User> {
    return this.http.put<User>(`${this.url}/edit/${id}`, userData).pipe(
      catchError(this.errorHandlingService.handleError<User>('edit'))
      );
  }

  //not complete
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`).pipe(
      catchError(this.errorHandlingService.handleError<void>('delete')) 
    );
  }

  /**
   * Check the login status by verifying the token
   */ 
  checkLoginStatus(): void {
    const token = this.getToken();
    this.isLoggedInSubject.next(!!token);
  }

  /**
   * Boolean check if the user is logged in
   * @returns True if the user is logged in
   */
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }


}
