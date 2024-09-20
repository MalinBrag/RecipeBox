import { RecipeModel } from './recipe.model';

/**
 * Interface representing the response recieved from the recipe API
 */
export interface RecipeResponse {
    hits: { recipe: RecipeModel }[];
    _links: {
        next: {
            href: string;
        };
    };
}
