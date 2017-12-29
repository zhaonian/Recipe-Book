import {Recipe} from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

        recipesChanged = new Subject<Recipe[]>();

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

        addRecipe(newRecipe: Recipe) {
                this.recipes.push(newRecipe);
                this.recipesChanged.next(this.recipes.slice());
        }

        updateRecipe(index: number, newRecipe: Recipe) {
                this.recipes[index] = newRecipe;
                this.recipesChanged.next(this.recipes.slice());
        }

        deleteRecipe(index: number) {
                this.recipes.splice(index, 1);
                this.recipesChanged.next(this.recipes.slice());
        }
}
