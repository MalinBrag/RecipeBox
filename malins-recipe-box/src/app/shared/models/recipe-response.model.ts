import { RecipeModel } from './recipe.model';

export interface RecipeResponse {
    hits: { recipe: RecipeModel }[];
    _links: {
        next: {
            href: string;
        };
    };
}
