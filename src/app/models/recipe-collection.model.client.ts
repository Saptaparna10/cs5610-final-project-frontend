import { Recipe } from './recipe.model.client';

export class RecipeCollection {

    id: Number;
    name: string;
    imageURL: string;
    recipes: Recipe[];
}
