import {Recipe} from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

        recipeSelected = new EventEmitter<Recipe>();

        private recipes: Recipe[] = [
                new Recipe(
                        'A Test Recipe',
                        'This is simply a test',
                        'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg',
                        [
                                new Ingredient('Meat', 1),
                                new Ingredient('Fries', 30),
                        ]
                ),
                new Recipe(
                        'Another Test Recipe',
                        'This is simply another test',
                        'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg',
                        [
                                new Ingredient('Buns', 2),
                                new Ingredient('Meat', 1),
                        ]
                )
        ];

        constructor(private slService: ShoppingListService) {}

        getRecipes() {
                return this.recipes.slice(); // return a copy
        }

        getRecipe(index: number) {
                return this.recipes.slice()[index];
        }

        addIngredientsToShoppingList(ingredients: Ingredient[]) {
                this.slService.addIngredients(ingredients);
        }
}
