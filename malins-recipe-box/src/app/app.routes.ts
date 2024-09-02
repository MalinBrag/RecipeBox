import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'filter', component: FilterComponent },
    { path: 'filter-form', component: FilterFormComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'recipe-list', component: RecipeListComponent }

];
