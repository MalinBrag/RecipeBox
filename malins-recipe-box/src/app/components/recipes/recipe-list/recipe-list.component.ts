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

  /**
   * Initialize the component and loads the recipes (with or without filters)
   */
  ngOnInit(): void {
    this.loadRecipes(this.filters, this.filtersChanged);
  }
 
  /**
   * Loads the recipes from the API
   * @param filters - The filters to apply
   * @param filtersChanged - Whether the filters have changed
   */
  loadRecipes(filters: { mealType: string[], preference: string[] }, filtersChanged: boolean): void {
    this.filtersChanged = filtersChanged;
 
    if (filtersChanged) {
      this.recipeService.resetPagination();
      this.recipes = [];
      this.allRecipesLoaded = false;
    }

    this.recipeService.getRecipes(filters.preference, filters.mealType).subscribe({
      next: (data: RecipeModel[]) => {
        if (data.length > 0) {
          this.recipes = this.recipes.concat(data);
        } else {
          this.allRecipesLoaded = true;
        }
      },
      error: (error: any) => {
        console.error('There was an error!', error);  
      }
    });
  } 

/**
 * Extracts the recipe ID from the URI
 * @param uri - The URI of the recipe
 * @returns Recipe ID
 */
  getIdFromUri(uri: string): string {
    const id = uri.split('#recipe_')[1];
    return id;
  }

  /**
   * Scrolls to the top of the page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
