import { Injectable } from '@angular/core';
import { AuthService } from './api/auth.service';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchUserService {
  private userDataSubject = new BehaviorSubject<Partial<User>>({});
  userData$ = this.userDataSubject.asObservable();

  constructor(
    private auth: AuthService,
  ) { }

  fetchUserId(): void {
    const userId = this.auth.getUserIdFromToken();

    if (userId) {
      this.auth.getUser(userId).subscribe(user => {
        this.userDataSubject.next(user);
      });
    } else {
      console.error('No user ID found in token');
    }
    
  }
}

