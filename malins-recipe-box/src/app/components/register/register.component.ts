import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFormComponent } from '../shared/user-form/user-form.component';
import { NgIf } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { DeviceService } from '../../services/device.service';
import { UserFormService } from '../../services/user-form.service';

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
  isMobile: boolean = false;
  
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  constructor(
    private dialogService: DialogService, 
    private deviceService: DeviceService,
    private userFormService: UserFormService,
  ) {}

  ngOnInit(): void {
    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;

      this.userFormService.setMode('register');

      if (this.isMobile) {
        this.openDialog();
      }
    });
  }

  openDialog(): void {
    this.dialogService.openDialog(UserFormComponent, {}).subscribe(result => {
      if (result) {
        console.log('Result:', result);
      }
    });
  }

  onSubmit(): void {
    this.userFormComponent.submitForm();
  }
 
}
