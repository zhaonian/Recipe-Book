import { NgModule } from '@angular/core';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const recipesRoutes: Routes = [
        {
                path: '', component: RecipesComponent, children: [
                        { path: '', component: RecipeStartComponent },
                        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
                        { path: ':id', component: RecipeDetailComponent },
                        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
                ]
        },
]

@NgModule({
        imports: [
                RouterModule.forChild(recipesRoutes)
        ],
        exports: [
                CommonModule,
                RouterModule,
        ]
})
export class RecipesRoutingModule {

}
