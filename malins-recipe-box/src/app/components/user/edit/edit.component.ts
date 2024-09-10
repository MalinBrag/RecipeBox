//EJ KLAR

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';
import { AuthService } from '../../../core/services/api/auth.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { FetchUserService } from '../../../core/services/fetch-user.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    UserFormComponent,
    NgIf,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  isLoggedIn: boolean = false;
  fields = ['name', 'email', 'password', 'password_confirmation'];
  mode: string = 'edit';

  @ViewChild(UserFormComponent) userForm!: UserFormComponent;

  constructor(
    private auth: AuthService, 
    private userFormService: UserFormService,
    private router: Router,
    private fetch: FetchUserService,
  ) { }
  
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      if (this.isLoggedIn) {
        this.fetch.fetchUserId();
        this.fetch.userData$.subscribe(userData => {
          this.populateForm(userData);
        });
      }
    });

    this.userFormService.setMode(this.mode);
  }

  populateForm(userData: Partial<User>): void {
    if (this.userForm) {
      this.userForm.form.patchValue({
        name: userData.name,
        email: userData.email,
      });
    }
  }

  handleFormSubmit = (formData: any) => {
    this.auth.edit(formData).subscribe(response => {
      console.log('Response:', response);
      this.router.navigate(['/my-page']);
    });
  }

}
