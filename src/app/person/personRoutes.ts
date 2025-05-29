import { Routes } from '@angular/router';
import { PersonRegisterComponent } from './person-register/person-register.component';
import { PersonListComponent } from './person-list/person-list.component';


export const personRoutes: Routes = [
  {
    path: 'person-register', 
    component: PersonRegisterComponent,
    title: 'Cadastro de Pessoas',
    runGuardsAndResolvers: 'always',
  }, {
    path: 'person-list', 
    component: PersonListComponent,
    title: 'Listagem de Pessoas',
    runGuardsAndResolvers: 'always',
  },

];