import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { personRoutes } from "./personRoutes";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(personRoutes ),    
    CommonModule,
  ]
})
export class PersonModule { }