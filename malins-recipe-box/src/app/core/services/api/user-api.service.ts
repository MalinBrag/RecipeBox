import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private userUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.userUrl}/register`, user);
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.userUrl}/sign-in`, user);
  }

}
