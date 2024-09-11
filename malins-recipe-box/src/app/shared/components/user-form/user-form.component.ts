import { Component, Optional, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { DialogService } from '../../../core/services/dialog.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() fields: string[] = [];
  @Output() onSubmit = new EventEmitter<any>();
  title: string = '';
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Optional() private dialogService: DialogService,
    private userFormService: UserFormService,
  ) {}

  setTitle(mode: string): void {
    switch (mode) {
      case 'sign-in':
        this.title = 'Sign In';
        break;
      case 'register':
        this.title = 'Register';
        break;
      case 'edit':
        this.title = 'Edit Profile';
        break;
      default:
        this.title = 'User Form';
        break;
    }
  }

  ngOnInit(): void {
    const mode = this.userFormService.getMode();
    this.setTitle(mode);
    this.initializeForm();
  }

  initializeForm(): void {
    const formControls: { [key: string]: any } = {};
    this.fields.forEach(field => {
      formControls[field] = ['', Validators.required];
    });

    this.form = this.formBuilder.group(formControls);

    if (this.fields.includes('password') && this.fields.includes('password_confirmation')) {
      this.form.setValidators(this.passwordMatchValidator());
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('password_confirmation');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
      }
      return null;
    };
  }

  cancelDialog(): void {
    this.dialogService.cancelDialog();
  }

  submitForm(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    } else {
      if (this.form.errors?.['passwordMismatch']) {
        window.alert('Passwords do not match!');
      }
    }
  }


}
