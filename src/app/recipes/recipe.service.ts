import {Recipe} from './recipe.model';
import { EventEmitter } from '@angular/core';


export class RecipeService {

        recipeSelected = new EventEmitter<Recipe>();

        private recipes: Recipe[] = [
                new Recipe(
                        'A Test Recipe',
                        'This is simply a test',
                        'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg'
                ),
                new Recipe(
                        'Another Test Recipe',
                        'This is simply another test',
                        'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg'
                )
        ];

        getRecipes() {
                return this.recipes.slice(); // return a copy
        }
}
