import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeApiService } from '../../services/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  recipesPerPage: number = 10;
  currentPage: number = 1;
  allRecipesLoaded: boolean = false;
  displayedRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeApiService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }
 
  loadRecipes(): void {
    const offset = (this.currentPage - 1) * this.recipesPerPage;
    this.recipeService.getRecipes(this.recipesPerPage, offset).subscribe({
      next: (data: Recipe[]) => {
          this.displayedRecipes = this.displayedRecipes.concat(data);
          this.currentPage++;
      }
    });
  } 

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
