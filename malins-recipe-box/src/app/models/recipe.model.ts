export interface Recipe {
    id: number;
    title: string;
    mealType: string[];
    preferences: string[];
    image: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}
