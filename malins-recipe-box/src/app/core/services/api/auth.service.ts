import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, of } from 'rxjs';
import { LoginData } from '../../../shared/models/login-data.model';
import { LoginResponse } from '../../../shared/models/login-response.model';
import { environment } from '../../../../environment/environment';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8000/api";
  private developerToken = environment.developerToken;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { 
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
  
  register(user: User): Observable<any> {
    return this.http.post(`${this.url}/register`, user).pipe(
      tap((response: any) => {
        console.log('register:', response);
        const token = response.token;
        const userId = response.userId;

        this.setToken(token);
        this.setUserUserId(userId);
      })
    );
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.url}/login`, data).pipe(
      tap((response: any) => {
        const token = response.token;
        const userId = response.userId;

        this.setToken(token);
        this.setUserUserId(userId);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.url}/logout`, {}).pipe(
      tap((response: any) => { 
        sessionStorage.removeItem('token');
        this.isLoggedInSubject.next(false);
        sessionStorage.clear();
      })
    ). subscribe(
      (response) => {
        //MÅSTE GÖRA NÅGOT HÄR ANNARS FUNKAR DET INTE
        console.log('logout:', response);
      }
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/getuser/${id}`, 
    );
  }

  edit(id: string, userData: User): Observable<User> {
    return this.http.put(`${this.url}/edit/${id}`, userData
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`, 
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
