import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';


@Injectable()
export class DataStorageService {
        constructor(
                private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService
        ) { }

        storeRecipes() {
                const token = this.authService.getToken();

                // return this.http.put(
                //         'https://ng-recipe-book-2de1c.firebaseio.com/recipes.json',
                //         this.recipeService.getRecipes(), {
                //                 observe: 'body',
                //                 // headers: new HttpHeaders()
                //                 params: new HttpParams().set('auth', token)
                //         });

                const req = new HttpRequest(
                        'PUT',
                        'https://ng-recipe-book-2de1c.firebaseio.com/recipes.json',
                        this.recipeService.getRecipes(),
                        {reportProgress: true, params: new HttpParams().set('auth', token)}
                );
                return this.http.request(req);
        }

        getRecipes() {
                const token = this.authService.getToken();
                // this.http.get<Recipe[]>('https://ng-recipe-book-2de1c.firebaseio.com/recipes.json?auth=' + token)
                this.http.get<Recipe[]>('https://ng-recipe-book-2de1c.firebaseio.com/recipes.json?auth=' + token, {
                        observe: 'body',
                        responseType: 'json',
                })
                        .map(
                                (recipes) => {
                                        for (let recipe of recipes) {
                                                if (!recipe['ingredients']) {
                                                        recipe['ingredients'] = [];
                                                }
                                        }
                                        return recipes;
                                }
                        )
                        .subscribe(
                                (recipes: Recipe[]) => {
                                        this.recipeService.setRecipes(recipes);
                                }
                        );
        }
}
