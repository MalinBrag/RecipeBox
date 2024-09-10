import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';
import { NgIf } from '@angular/common';
import { DialogService } from '../../../core/services/dialog.service';
import { DeviceService } from '../../../core/services/device.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { AuthService } from '../../../core/services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    UserFormComponent,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMobile: boolean = false;
  fields: string[] = ['name', 'email', 'password', 'password_confirmation'];
  mode: string = 'register';

  constructor(
    private dialogService: DialogService, 
    private deviceService: DeviceService,
    private userFormService: UserFormService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.userFormService.setMode(this.mode);
    
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      if (this.isLoggedIn) {
        window.alert('You are already logged in!'); 
        this.router.navigate(['/my-page']);
        return;
      }
    });

    if (this.isMobile) {
      this.openRegisterDialog();
    }
  }

 openRegisterDialog(): void {
    this.dialogService.openDialog(UserFormComponent, { fields: this.fields }).subscribe(result => {
      
      if (result) {
        console.log('Result:', result);
      }
    });
  }

  handleFormSubmit = (formData: any) => {
    this.auth.register(formData).subscribe(response => {
      console.log('Response:', response);
      
      if (this.isMobile) {
        this.dialogService.closeDialog(response);
      } else {
        this.router.navigate(['/my-page']);
      }
    });
  }
 // TODO om mailen finns redan gör en alert
}
