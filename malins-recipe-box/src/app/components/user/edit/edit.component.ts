import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';
import { UserApiService } from '../../../core/services/api/user-api.service';
import { UserFormService } from '../../../core/services/user-form.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    UserFormComponent,
    NgIf
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  loggedIn: boolean = true;
  user: User = {  //mockdata
    name: 'Malin',
    email: 'malin@malin.se',
    password: '123',
  }

  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  constructor(
    private userApiService: UserApiService, 
    private userFormService: UserFormService,
  ) { }
  
  ngOnInit() {
    //this.user = this.userFormService.getUser();
    this.loggedIn = true;
    this.userFormService.setMode('edit');
  }


  updateUser(user: User) {
    //this.userApiService.updateUser(user).subscribe();
  }

  onSubmit(): void {
    this.userFormComponent.submitForm();
  }

}
