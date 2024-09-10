//EJ KLAR

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../core/services/dialog.service';
import { Router, RouterLink } from '@angular/router';
import { UserFormService } from '../../../core/services/user-form.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/api/auth.service';
import { User } from '../../../shared/models/user.model';
import { FetchUserService } from '../../../core/services/fetch-user.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {  
  isLoggedIn: boolean = false;
  userData: Partial<User> = {};
  
  constructor(
    private dialogService: DialogService,
    private userFormService: UserFormService,
    private auth: AuthService,
    private router: Router,
    private fetch: FetchUserService,
  ) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      if (this.isLoggedIn) {
        this.fetch.fetchUserId();
        this.fetch.userData$.subscribe(userData => {
          this.userData = userData;
        });
      }
    });
  }
  
  deleteAccount(): void {
    if (this.isLoggedIn && this.userData.id) {
      this.auth.delete(this.userData.id).subscribe(() => {
        this.auth.logout();
      });
    }
    this.router.navigate(['/']);
  }


}
