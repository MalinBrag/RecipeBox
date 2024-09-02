import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private apiUrl = 'assets/mock-data.json';

  constructor(private http: HttpClient) { }

  getRecipes(limit: number, offset: number): Observable<Recipe[]> {
    return this.http.get<{ recipes: Recipe[] }>(this.apiUrl).pipe(
      map(response => response.recipes.slice(offset, offset + limit))
    );
  }


}
