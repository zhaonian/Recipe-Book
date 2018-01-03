import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';


const initialState = {
        ingredients: [
                new Ingredient('Apples', 5),
                new Ingredient('Tomatoes', 10),
        ]
}

// ES 6 Arrow function wont work
export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
        switch (action.type) {
                case ShoppingListActions.ADD_INGREDIENT:
                        return {
                                ...state,
                                ingredients: [...state.ingredients, action.payload]
                        };
                default:
                        return state;
        }
}
