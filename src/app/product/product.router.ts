import { Routes } from '@angular/router';
import path from 'path';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { CategoryComponent } from '../category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductBatchRegisterComponent } from './product-batch-register/product-batch-register.component';
import { ProductItemComponent } from './product-item/product-item.component';


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
    path: 'new-batch' , component: ProductBatchRegisterComponent,
    title: 'Novo Lote de Produtos',

  },
  {
    path: 'item-list' , component: ProductItemComponent,
    title: 'Listar Itens de Produtos',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    title: 'Listar Produtos',
    runGuardsAndResolvers: 'always',
  }
];