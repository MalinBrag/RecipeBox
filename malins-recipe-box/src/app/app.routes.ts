import { Routes } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeViewComponent } from './components/recipe-view/recipe-view.component';   
import { RecipeInfoComponent } from './components/shared/recipe-info/recipe-info.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/shared/user-form/user-form.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

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

];
