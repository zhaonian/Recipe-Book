import { Component, OnInit, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
        selector: 'app-shopping-edit',
        templateUrl: './shopping-edit.component.html',
        styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
        @ViewChild('f') slForm: NgForm;
        subscription: Subscription;
        editMode = false;
        editedItemIndex: number;
        editedItem: Ingredient;

        constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

        ngOnInit() {
                this.subscription = this.slService.startedEditting.subscribe(
                        (index: number) => {
                                this.editedItemIndex = index;
                                this.editMode = true;
                                this.editedItem = this.slService.getIngredient(index);
                                this.slForm.setValue({
                                        name: this.editedItem.name,
                                        amount: this.editedItem.amount
                                });
                        }
                );
        }

        ngOnDestroy() {
                this.subscription.unsubscribe();
        }

        onSubmit(form: NgForm) {
                const value = form.value;
                const newIngredient = new Ingredient(value.name, value.amount);
                if (this.editMode) {
                        this.slService.updateIngredient(this.editedItemIndex, newIngredient);
                } else {
                        // this.slService.addIngredient(newIngredient);
                        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
                }
                this.editMode = false;
                form.reset();
        }

        onDelete() {
                this.slService.deleteIngredient(this.editedItemIndex);
                this.onClear();
        }

        onClear() {
                this.slForm.reset();
                this.editMode = false;
        }

}
