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

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { 
    this.checkLoginStatus();
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setUserUserId(userId: string): void {
    sessionStorage.setItem('userId', userId);
  }

  getUserId(): string {
    return sessionStorage.getItem('userId')!;
  }
  
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

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/getuser/${id}`).pipe(
      catchError(this.errorHandlingService.handleError<User>('getUser'))
    );
  }

  edit(id: string, userData: User): Observable<User> {
    return this.http.put<User>(`${this.url}/edit/${id}`, userData).pipe(
      catchError(this.errorHandlingService.handleError<User>('edit'))
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`).pipe(
      catchError(this.errorHandlingService.handleError<void>('delete')) 
    );
  }

  checkLoginStatus(): void {
    const token = this.getToken();
    this.isLoggedInSubject.next(!!token);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }


}
