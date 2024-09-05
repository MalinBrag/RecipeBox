import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FilterComponent } from '../filter/filter.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FilterComponent,
    FooterComponent,
    RecipeListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}