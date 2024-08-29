import { Component, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { DeviceService } from '../../services/device.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = "Malin's Recipe Box";
 // isMobile = computed(() => this.deviceService.isMobile());

 // constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
  
  }

}
