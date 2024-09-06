import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    RouterLink,    
  ],
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  title = "My Page";
  loggedIn: boolean = false;
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedIn = true;

  }

  logout(): void {
    //skicka till backend att logga ut
    this.loggedIn = false;
    this.router.navigate(['home']);
  }






}
