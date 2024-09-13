import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/recipes/filter/filter.component';
import { FilterFormComponent } from './components/recipes/filter-form/filter-form.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeViewComponent } from './components/recipes/recipe-view/recipe-view.component';   
import { RecipeInfoComponent } from './shared/components/recipe-info/recipe-info.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { MyPageComponent } from './components/user/my-page/my-page.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'filter', component: FilterComponent },
    { path: 'filter-form', component: FilterFormComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'recipe-list', component: RecipeListComponent },
    { path: 'recipe-view/:id', component: RecipeViewComponent },
    { path: 'recipe-info', component: RecipeInfoComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-form', component: UserFormComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'my-page', component: MyPageComponent, canActivate: [authGuard] },
    { path: 'edit', component: EditComponent, canActivate: [authGuard] },
    { path: 'delete', component: DeleteComponent, canActivate: [authGuard] },
    { path: '**', component: NotFoundComponent }
   
];
