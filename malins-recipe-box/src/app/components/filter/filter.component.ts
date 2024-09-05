import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { DeviceService } from '../../services/device.service';
import { FilterFormComponent } from '../filter-form/filter-form.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    NgIf,
    FilterFormComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  isMobile: boolean = false;
  filters = {};

  constructor(
    private dialogService: DialogService, 
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  openFilterDialog() {
    this.dialogService.openDialog(FilterFormComponent, {}).subscribe(result => {
      if (result) {
        this.filters = result;
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    console.log('Applying filters:', this.filters);
  }


}
