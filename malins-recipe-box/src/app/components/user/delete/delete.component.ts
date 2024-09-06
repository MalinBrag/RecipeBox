import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../core/services/dialog.service';
import { Router, RouterLink } from '@angular/router';
import { UserFormService } from '../../../core/services/user-form.service';
import { NgIf } from '@angular/common';
import { UserApiService } from '../../../core/services/api/user-api.service';

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
  loggedIn: boolean = true;
  
  constructor(
    private dialogService: DialogService,
    private userFormService: UserFormService,
    private userApi: UserApiService,
    private router: Router
  ) {}
  
  deleteAccount(): void {

    //skicka till backend
    console.log('User deleted'); 
    this.loggedIn = false;
    this.router.navigate(['/']);
  }


}
