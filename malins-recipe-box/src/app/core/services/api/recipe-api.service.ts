import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RecipeModel } from '../../../shared/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private url = 'assets/mock-data.json';

  constructor(private http: HttpClient) { }

  getRecipes(limit: number, offset: number): Observable<RecipeModel[]> {
    return this.http.get<{ recipes: RecipeModel[] }>(this.url).pipe(
      map(response => response.recipes.slice(offset, offset + limit))
    );
  }

  getRecipeById(id: string): Observable<RecipeModel | undefined> {
    return this.http.get<{ recipes: RecipeModel[] }>(this.url).pipe(
      map(response => response.recipes.find(recipe => recipe.id === id)),
      catchError(error => {
        console.error('Error fetching recipe', error);
        return of(undefined);
      })
    )
  }


}
