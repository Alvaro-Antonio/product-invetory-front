import { Routes } from '@angular/router';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';


export const customerRoutes: Routes = [
  {
    path: 'customer-register', 
    component: CustomerRegisterComponent,
    title: 'Cadastro de Clientes',
    runGuardsAndResolvers: 'always',
  },
];