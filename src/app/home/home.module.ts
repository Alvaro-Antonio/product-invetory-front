import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productRoutes } from '../product/product.router';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(productRoutes ),    
    CommonModule,
  ]
})
export class HomeModule { }
