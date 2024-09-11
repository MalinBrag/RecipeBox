//EJ KLAR

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';
import { AuthService } from '../../../core/services/api/auth.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    UserFormComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  fields = ['name', 'email', 'password', 'password_confirmation'];
  mode: string = 'edit';
  userId?: string;

  @ViewChild(UserFormComponent) userForm!: UserFormComponent;

  constructor(
    private auth: AuthService, 
    private userFormService: UserFormService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.userId = this.auth.getUserId();

    if (this.userId) {
      this.populateForm(this.userId);
    }

    this.userFormService.setMode(this.mode);
  }

  populateForm(userId: string): void {
    //EJ KLAR
  }

  handleFormSubmit = (formData: any) => {
    //EJ KLAR
    this.userId = this.auth.getUserId();
    this.auth.edit(this.userId, formData).subscribe(response => {
      this.router.navigate(['/my-page']);
    });
  }

}
