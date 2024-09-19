import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RecipeModel } from '../../../shared/models/recipe.model';
import { RecipeResponse } from '../../../shared/models/recipe-response.model';
import { BaseQueryParams } from '../../../shared/models/base-query-params.model';

@Injectable({
  providedIn: 'root'
})

export class RecipeApiService {
  private apiUrl = "https://api.edamam.com/api/recipes/v2";
  private appId = "24d47173";
  private appKey = "9366561ba70afd77da0a5b9bc7b65037";

  private nextPage: string | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Reset the pagination to start
   */
  resetPagination() {
    this.nextPage = null;
  }

  private baseQuery: BaseQueryParams = {
    type: 'public',
    app_id: this.appId,
    app_key: this.appKey,
    dishType: ['Bread', 'Desserts', 'Main course', 'Pancake', 'Salad', 'Sandwiches', 'Soup'],
    imageSize: 'REGULAR',
    field: ['uri', 'label', 'image', 'yield', 'healthLabels', 'ingredientLines', 'totalTime', 'mealType', 'dishType']
  }

  /**
   * Build the query string for the API request
   * @param healthLabelParams - Health labels to filter by (allergies, preferences, etc.)
   * @param mealTypeParams - Meal types to filter by
   * @returns The query string
   */
  private buildQuery(healthLabelParams: string[], mealTypeParams: string[]): string {
    let queryString = `type=${this.baseQuery.type}&app_id=${this.baseQuery.app_id}&app_key=${this.baseQuery.app_key}`;
    
    if (healthLabelParams && healthLabelParams.length > 0) {
      queryString += healthLabelParams
        .map(healthLabel => `&health=${encodeURIComponent(healthLabel)}`)
        .join('');
    }

    if (mealTypeParams && mealTypeParams.length > 0) {
      queryString += mealTypeParams
        .map(mealType => `&mealType=${encodeURIComponent(mealType)}`)
        .join('');
    }

    queryString += this.baseQuery.dishType
      .map(dishType => `&dishType=${encodeURIComponent(dishType)}`)
      .join('');

    queryString += `&imageSize=${this.baseQuery.imageSize}`;
    queryString += this.baseQuery.field
      .map(field => `&field=${encodeURIComponent(field)}`)
      .join('');

    return queryString;
  }

  /**
   * Fetches recipes from the API based on the health labels and meal types if there are any
   * @param healthLabel - Health labels to filter by (allergies, preferences, etc.)
   * @param mealType -  Meal types to filter by
   * @returns An observable of RecipeModel
   */
  getRecipes(healthLabel: string[], mealType: string[]): Observable<RecipeModel[]> {
    const queryString = this.buildQuery(healthLabel, mealType);
    const url = this.nextPage || `${this.apiUrl}?${queryString}`;

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Accept-Language': 'en'
    });
    return this.http.get<RecipeResponse>(url, { headers }).pipe(
      map(response => {
        this.nextPage = response._links?.next?.href || null;
        return response.hits.map(hit => hit.recipe);
      }),
      catchError(error => {
        console.error('Error loading recipes:', error);
        return of([]);
      })
    );
    
  }

  /**
   * Gets the field parameters from the base query
   * @returns The field parameters as a string
   */
  getFieldParams(): string {
    return this.baseQuery.field.map(field => `&field=${encodeURIComponent(field)}`).join('');
  }

  /**
   * Fetches recipe by ID
   * @param id - The ID of the recipe
   * @returns An recipe object
   */
  getRecipeById(id: string): any {
    const fields = this.getFieldParams();
    const url = `${this.apiUrl}/${id}?type=public&app_id=${this.appId}&app_key=${this.appKey}${fields}`;

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': 'en'
    });

    return this.http.get<{ recipe: RecipeModel }>(url, { headers }).pipe(
      map(response => {
        const recipe = response.recipe;
        return recipe;
      }),
      catchError(error => {
      console.error('Error loading recipe:', error);
      return of(undefined);
    })
  );
  }

}
