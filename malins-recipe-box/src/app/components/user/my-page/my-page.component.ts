import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/api/auth.service';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent {
  
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  /**
   * Log out the user and navigate to the home page
   */
  logout(): void {
    this.auth.logout();
    this.router.navigate(['home']);
  }



}
