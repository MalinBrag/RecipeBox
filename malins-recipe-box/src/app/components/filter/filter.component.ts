import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
//import { DeviceService } from '../../services/device.service';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    FilterFormComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  isMobile: boolean = false;
  filters = {};

  constructor(public dialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkDeviceType();
  }

  ngOnInit() {
    this.checkDeviceType();
  }

  checkDeviceType() {
    this.isMobile = window.innerWidth < 768;
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterFormComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.filters = result;
        this.applyFilters();
      }
    });  
  }

  applyFilters(): void {
    console.log('Applying filters:', this.filters);
  }


}
