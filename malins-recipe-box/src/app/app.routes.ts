import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'filter', component: FilterComponent },

];
