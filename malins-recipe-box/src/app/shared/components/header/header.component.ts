import { Component, OnInit, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { DialogService } from '../../../core/services/dialog.service';
import { RegisterComponent } from '../../../components/user/register/register.component';
import { SignInComponent } from '../../../components/user/sign-in/sign-in.component';
import { AuthService } from '../../../core/services/api/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    NgClass,
    RouterLink,
    RegisterComponent,
    SignInComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() fields: string[] = [];
  isLoggedIn: boolean = false;
  title = "Malin's Recipe Box";
  isMobile: boolean = false;
  dropdownOpen: boolean = false;

  constructor(
    private deviceService: DeviceService, 
    private router: Router,
    private dialogService: DialogService,
    private auth: AuthService,
  ) { }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  /**
   * Toggles the dropdown menu for mobile view
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Opens the sign in dialog for mobile view or redirects to the sign in page for desktop
   */
  openSignIn() {
    if (this.isMobile) {
      this.dialogService.openDialog(SignInComponent, { 
        fields: ['email', 'password'],
      });
      this.dropdownOpen = false;
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  /**
   * Opens the register dialog for mobile view or redirects to the register page for desktop
   */
  openRegister() {
    if (this.isMobile) {
      this.dialogService.openDialog(RegisterComponent, {
         fields: ['name', 'email', 'password', 'password_confirmation']
         }); 
      this.dropdownOpen = false;
    } else {
      this.router.navigate(['/register']);
    }
  }

  /**
   * Redirects to the my page if the user is logged in
   */
  openMyPage() {
    if (this.isLoggedIn) {
      this.router.navigate(['/my-page']).then(() => {
        this.dropdownOpen = false; 
      });
    }
  }

  /**
   * Logs the user out and redirects to the landing page
   */
  logout(): void {
    this.auth.logout();
    this.dropdownOpen = false;
    this.router.navigate(['home']);
  } 

  
}
