import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';
import { NgIf } from '@angular/common';
import { DialogService } from '../../../core/services/dialog.service';
import { DeviceService } from '../../../core/services/device.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { AuthService } from '../../../core/services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    UserFormComponent,
    NgIf,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMobile: boolean = false;
  fields: string[] = ['email', 'password'];
  mode: string = 'sign-in';

  constructor(
    private dialogService: DialogService,
    private deviceService: DeviceService,
    private userFormService: UserFormService,
    private auth: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      if (this.isLoggedIn) {
        window.alert('You are already logged in!'); 
        this.router.navigate(['/my-page']);
        return;
      }
    });

    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;

      if (this.isMobile) {
        this.openSignInDialog();
      }
    });

    this.userFormService.setMode(this.mode);
  }

  public openSignInDialog(): void {
    this.dialogService.openDialog(UserFormComponent, { fields: this.fields })
    .subscribe(result => {
     
      if (result) {
        console.log('Result:', result);
      }
    });
  }

  handleFormSubmit = (formData: any) => {
    this.auth.login(formData).subscribe(response => {
      console.log('Response:', response);

      if (this.isMobile) {
        this.dialogService.closeDialog(response);
      } else {
        this.router.navigate(['/my-page']);
      }
    });
  }

}
