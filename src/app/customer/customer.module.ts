import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { customerRoutes } from "./customerRoutes";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(customerRoutes ),    
    CommonModule,
  ]
})
export class CustomerModule { }