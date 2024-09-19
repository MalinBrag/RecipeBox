import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { RecipeApiService } from '../../../core/services/api/recipe-api.service';
import { RecipeModel } from '../../../shared/models/recipe.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf
  ],
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  recipe!: RecipeModel;

  constructor(
    private recipeService: RecipeApiService,
    private route: ActivatedRoute
  ) { }

  /**
   * Load the recipe when the component initializes
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipe(id);
    }
  }

  /**
   * Load a recipe by ID
   * @param id - The recipe ID
   */
  loadRecipe(id: string): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: RecipeModel | undefined) => {
        if (recipe) {
          this.recipe = recipe;
        } else {
          console.error('Recipe not found');
        }
      },
      error: (error: any) => {
        console.error('Error loading recipe:', error);
      }
    });
  }

  /**
   * Share the recipe using the Web Share API
   */
  shareRecipe(): void {
    if (navigator.share) {
      navigator.share({
        title: this.recipe.label,
        text: 'Check out this recipe!',
        url: window.location.href
      }).then(() => {
        window.alert('Thanks for sharing!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      console.error('Web Share API not supported');
    }
  }

}
