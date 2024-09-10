import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { LoginData } from '../../../shared/models/login-data.model';
import { LoginResponse } from '../../../shared/models/login-response.model';
import { environment } from '../../../../environment/environment';
import { User } from '../../../shared/models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8000/api";
  private developerToken = environment.developerToken;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

 /* private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.developerToken}`
    })
  };*/

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
  
  register(user: User): Observable<any> {
    return this.http.post(`${this.url}/register`, user).pipe(
      tap((response: any) => {
        const token = response.token;
        this.setToken(token);
      })
    );
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.url}/login`, data,
      { headers: this.getHeaders() }
    ).pipe(
      tap((response: any) => {
        const token = response.token;
        this.setToken(token);
      })
    )
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    sessionStorage.clear();
  }

  getUser(id: string): Observable<any> {
    return this.http.get<User>(`${this.url}/getuser/${id}`, 
      { headers: this.getHeaders() }
    );
  }

  edit(id: string): Observable<User> {
    return this.http.put(`${this.url}/edit/${id}`, 
      { headers: this.getHeaders() }
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`, 
      { headers: this.getHeaders() }
    );
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ? token : this.developerToken}`
    });
  }

  getProtectedResource(): Observable<any> {
    return this.http.get(`${this.url}/protected-route`,
      { headers: this.getHeaders() }
    );
  }

  checkLoginStatus(): void {
    const token = this.getToken();
    this.isLoggedInSubject.next(!!token);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  getUserIdFromToken(): string | null{
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      decoded.userId = decoded.sub;
      return decoded.userId;
    }
    return null;
  }


}
