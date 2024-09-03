export interface RecipeModel {
    id: string;
    title: string;
    mealType: string[];
    preferences: string[];
    image: string;
    description: string;
    ingredients: string[];
    instructions: string;
}
