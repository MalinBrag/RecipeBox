/**
 * Interface for the Recipe model structure
 */

export interface RecipeModel {
    uri: string;
    label: string;
    image: string;
    healthLabels: string[];
    ingredientLines: string[];
    totalTime: number;
    mealType: string[];
    dishType: string[];
    yield: number;
}
