import { Routes } from '@angular/router';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerListComponent } from './customer-list/customer-list.component';


export const customerRoutes: Routes = [
  {
    path: 'customer-register', 
    component: CustomerRegisterComponent,
    title: 'Cadastro de Clientes',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'customer-list', 
    component: CustomerListComponent,
    title: 'Listagem de Clientes',
    runGuardsAndResolvers: 'always',
  },
];