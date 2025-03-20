import { Routes } from '@angular/router';
import path from 'path';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { CategoryComponent } from '../category/category.component';
import { ProductListComponent } from './product-list/product-list.component';


export const productRoutes: Routes = [
  {
    path: 'product-register', 
    component: ProductRegisterComponent,
    title: 'Cadastro de Produtos',
    runGuardsAndResolvers: 'always',
    
  },
  {
    path: 'categories', component: CategoryComponent,
    title: 'Categorias',
    runGuardsAndResolvers: 'always',
  },
  {
    path: '' , component: ProductListComponent,
    title: 'Lista de Produtos',
    runGuardsAndResolvers: 'always',
  }
];