//PAGINATION EJ KLAR


import { Component, OnInit, Input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { RecipeModel } from '../../../shared/models/recipe.model';
import { RecipeApiService } from '../../../core/services/api/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf,
    RouterLink,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [];
  allRecipesLoaded: boolean = false;
  filters = { mealType: [], preference: [] };
  filtersChanged = false;

  constructor(
    private recipeService: RecipeApiService,
  ) { }

  ngOnInit(): void {
    this.loadRecipes(this.filters, this.filtersChanged);
  }
 
  loadRecipes(filters: { mealType: string[], preference: string[] }, filtersChanged: boolean): void {
    this.filtersChanged = filtersChanged;
    console.log('MealType:', filters.mealType);
    console.log('Preference:', filters.preference);
 
    if (filtersChanged) {
      console.log('Filters changed');
      this.recipeService.resetPagination();
      this.recipes = [];
      this.allRecipesLoaded = false;
    }

    this.recipeService.getRecipes(filters.preference, filters.mealType).subscribe({
      next: (data: RecipeModel[]) => {
        if (data.length > 0) {
          this.recipes = this.recipes.concat(data);
          console.log('Recipes:', data);
        } else {
          this.allRecipesLoaded = true;
        }
      },
      error: (error: any) => {
        console.error('There was an error!', error);  
      }
    });
  } 

  getIdFromUri(uri: string): string {
    const id = uri.split('#recipe_')[1];
    return id;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
