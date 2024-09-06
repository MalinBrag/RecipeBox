import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FilterComponent } from '../recipes/filter/filter.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';

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