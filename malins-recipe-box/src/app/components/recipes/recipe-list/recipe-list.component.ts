import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { RecipeModel } from '../../../shared/models/recipe.model';
import { RecipeApiService } from '../../../core/services/api/recipe-api.service';
import { RecipeInfoComponent } from '../../../shared/components/recipe-info/recipe-info.component';  

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    RouterLink,
    RecipeInfoComponent
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [];
  recipesPerPage: number = 10;
  currentPage: number = 1;
  allRecipesLoaded: boolean = false;
  displayedRecipes: RecipeModel[] = [];

  constructor(private recipeService: RecipeApiService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }
 
  loadRecipes(): void {
    const offset = (this.currentPage - 1) * this.recipesPerPage;
    this.recipeService.getRecipes(this.recipesPerPage, offset).subscribe({
      next: (data: RecipeModel[]) => {
          this.displayedRecipes = this.displayedRecipes.concat(data);
          this.currentPage++;
      }
    });
  } 

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
