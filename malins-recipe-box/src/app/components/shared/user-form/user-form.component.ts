import { Component, Optional, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '../../../services/dialog.service';
import { User } from '../../../models/user.model';
import { UserApiService } from '../../../services/user-api.service';
import { CommonModule } from '@angular/common';
import { UserFormService } from '../../../services/user-form.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title: string = '';
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userApi: UserApiService,
    @Optional() private dialogService: DialogService,
    private userFormService: UserFormService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.setTitle(this.userFormService.getMode());
  }

  setTitle(mode: string): void {
    if (mode === 'sign-in') {
      this.title = 'Sign in';
    } else if (mode === 'register') {
      this.title = 'Register as user';
    } else if (mode === 'edit') {
      this.title = 'Edit profile';
    }
  }

  closeDialog(): void {
    this.dialogService.closeDialog();
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value as User;

      if (this.userFormService.getMode() === 'sign-in') {
        console.log('Signing in user:', user);
        this.userApi.signIn(user).subscribe(response => {
          this.dialogService.closeDialog(response);
        });
      } else if (this.userFormService.getMode() === 'register') {
        console.log('Registering user:', user); 
        this.userApi.register(user).subscribe(response => {
          this.dialogService.closeDialog(response);
        });
      }
    } else {
      alert('Please fill in all fields');
    }
  }

}
