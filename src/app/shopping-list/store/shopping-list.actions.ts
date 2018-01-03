import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'add_ingredient';

export class AddIngredient implements Action {
        readonly type = ADD_INGREDIENT;
        payload: Ingredient;
}

export type ShoppingListActions = AddIngredient;
