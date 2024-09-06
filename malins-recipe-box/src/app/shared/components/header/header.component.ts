import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { NgIf, NgClass } from '@angular/common';
import { DialogService } from '../../../core/services/dialog.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserFormService } from '../../../core/services/user-form.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    UserFormComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = "Malin's Recipe Box";
  isMobile: boolean = false;
  loggedIn: boolean = false;
  dropdownOpen: boolean = false;

  constructor(
    private deviceService: DeviceService, 
    private router: Router,
    private dialogService: DialogService,
    private userFormService: UserFormService,
  ) { }

  ngOnInit(): void {
    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.loggedIn = true;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSignIn() {
    if (this.isMobile) {
      this.openUserFormDialog('sign-in');
    } else {
      this.router.navigate(['/sign-in']).then(() => {
        this.dropdownOpen = false;
      });
    }
  }

  onRegister() {
    if (this.isMobile) {
      this.openUserFormDialog('register');
    } else {
      this.router.navigate(['/register']).then(() => {
        this.dropdownOpen = false;
      });
    }
  }

  onMyPage() {
    this.router.navigate(['/my-page']).then(() => {
      this.dropdownOpen = false;
    });
  }

  openUserFormDialog(mode: string) {
    this.userFormService.setMode(mode);
    this.dialogService.openDialog(UserFormComponent, { mode }).subscribe(result => {
      if (result) {
        console.log('Result:', result);
        alert(`Welcome, ${result.name}!`)
        this.loggedIn = true;
      }
    });

    this.dropdownOpen = false;
  } 

  logout(): void {
    //skicka till backend att logga ut
    this.loggedIn = false;
    this.dropdownOpen = false;
  } 



  
}
