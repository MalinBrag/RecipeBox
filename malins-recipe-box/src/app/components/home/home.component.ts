import { Component, ViewChild } from '@angular/core';
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
  @ViewChild(RecipeListComponent) recipeList!: RecipeListComponent;

  /**
   * Handle the filters applied to the recipes
   * @param data - The filters applied to the recipes, if there are any
   */
  onFiltersApplied(data: { filters: { mealType: string[], preference: string[] }, filtersChanged: boolean }) {
    this.recipeList.loadRecipes(data.filters, data.filtersChanged);
  }

}