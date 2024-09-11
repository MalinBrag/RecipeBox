//EJ KLAR

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/api/auth.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {  
  userId: string | null = null;
  
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.userId = this.auth.getUserId();
  }
  
  deleteAccount(): void {
    if (this.userId) {
      this.auth.delete(this.userId).subscribe(() => {
        this.auth.logout();
        this.router.navigate(['/']);
      });
    }
  }


}
