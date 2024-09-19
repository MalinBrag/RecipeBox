import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../../core/services/device.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { AuthService } from '../../../core/services/api/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { LoginData } from '../../../shared/models/login-data.model';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    UserFormComponent,
    CommonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isMobile: boolean = false;
  fields: string[] = ['email', 'password'];
  mode: string = 'sign-in';

  constructor(
    private deviceService: DeviceService,
    private userFormService: UserFormService,
    private auth: AuthService,
    private router: Router,
    private errorService: ErrorHandlingService,
    ) {}

  /**
   * Initialize the component and set mode "sign-in" for the form
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
  handleFormSubmit = (formData: LoginData) => {
    this.auth.login(formData).pipe(
      catchError(this.errorService.handleError<any>('login'))
    ).subscribe(response => {
      if (response.error) { 
        window.alert("Credentials not correct");
      } else {
        this.router.navigate(['/my-page']);
      }
    });
  }

}
