import { Component, OnInit, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { NgIf, NgClass } from '@angular/common';
import { DialogService } from '../../../core/services/dialog.service';
import { RegisterComponent } from '../../../components/user/register/register.component';
import { SignInComponent } from '../../../components/user/sign-in/sign-in.component';
import { AuthService } from '../../../core/services/api/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
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

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  openSignIn(): void {
    if (this.isMobile) {
      this.dialogService.openDialog(SignInComponent, { 
        fields: ['email', 'password'],
      });
      this.dropdownOpen = false;
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  openRegister(): void {
    if (this.isMobile) {
      this.dialogService.openDialog(RegisterComponent, {
         fields: ['name', 'email', 'password', 'password_confirmation']
         }); 
      this.dropdownOpen = false;
    } else {
      this.router.navigate(['/register']);
    }
  }

  openMyPage() {
    if (this.isLoggedIn) {
      this.router.navigate(['/my-page']).then(() => {
        this.dropdownOpen = false; // TODO KOLLA OM DROPDOWN ÄR ÖPPEN, OM INTE, SÅ BEHÖVS BARA ROUTERLINK, EJ FUNKTION
      });
    }
  }

  logout(): void {
    this.auth.logout();

    if (!this.isLoggedIn) {
      this.dropdownOpen = false;
      this.router.navigate(['home']);
    }
  } 

  
}
