import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../../core/services/device.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { AuthService } from '../../../core/services/api/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { UserFormData } from '../../../shared/models/userform-data.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    UserFormComponent,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isMobile: boolean = false;
  fields: string[] = ['name', 'email', 'password', 'password_confirmation'];
  mode: string = 'register';

  constructor( 
    private deviceService: DeviceService,
    private userFormService: UserFormService,
    private auth: AuthService,
    private router: Router,
    private errorService: ErrorHandlingService,
  ) {}

  /***
   * Initialize the component and set mode "register" for the form
   */
  ngOnInit(): void {
    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.userFormService.setMode(this.mode);
  }

  /**
   * Handle the form submit event
   * @param formData - The form data
   */
  handleFormSubmit = (formData: UserFormData) => {
    this.auth.register(formData).pipe(
      catchError(this.errorService.handleError<any>('register'))
    ).subscribe(response => {
      if (response.error) { 
        window.alert("Something happened, please try again");
      } else {
        this.router.navigate(['/my-page']);
      }
    });
  }
 // TODO om mailen finns redan gör en alert
}
