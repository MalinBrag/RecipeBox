import { Component, Optional, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  }

  closeDialog(): void {
    this.dialogService.closeDialog();
  }

  submitForm(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }


}
