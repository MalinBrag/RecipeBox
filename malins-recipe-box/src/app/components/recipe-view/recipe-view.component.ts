import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { RecipeApiService } from '../../services/recipe-api.service';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeInfoComponent } from '../shared/recipe-info/recipe-info.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [
    RouterOutlet,
    RecipeInfoComponent,
    NgForOf
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipe(id);
    }
  }

  loadRecipe(id: string): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: RecipeModel | undefined) => {
        if (recipe) {
          this.recipe = recipe;
        } else {
          console.error('Recipe not found');
        }
      },
      error: (error) => {
        console.error('Error loading recipe:', error);
      }
    });
  }

  shareRecipe(): void {
    if (navigator.share) {
      navigator.share({
        title: this.recipe.title,
        text: 'Check out this recipe!',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      console.error('Web Share API not supported');
    }
  }

}
