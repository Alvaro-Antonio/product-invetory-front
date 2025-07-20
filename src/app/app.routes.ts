import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
    { path: '', loadChildren: () => import('./person/person.module').then(m => m.PersonModule) },
    { path: '', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },     
];
