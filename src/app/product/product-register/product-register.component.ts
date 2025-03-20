import { Component } from '@angular/core';
import { CategoryService } from '../../category/category.service';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../../category/models/category.model';
import { CreateProductDTO, Product } from '../product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-register',
  imports: [FormsModule],
  providers: [],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css'
})
export class ProductRegisterComponent{
  
  categories: Category[] = [];
  product: CreateProductDTO = {
    name: '',
    description: '',
    categories: []
  };
  
    constructor(
      private categoryService: CategoryService,
      private productService: ProductService,
      private toastr: ToastrService) {}
  
    ngOnInit(): void {
      this.categoryService.getCategories().subscribe((data: Category[]) => {
        this.categories = data;
      });
    }
  
    onSubmit(): void {
      this.productService.createProduct(this.product).subscribe(response => {
        console.log('Produto cadastrado com sucesso!', response);
        this.toastr.success('Produto cadastrado com sucesso!');
        // Resetar o formulário após o envio
        this.product = {
          name: '',
          description: '',
          categories: []
        };
      });
    }
}
