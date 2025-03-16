import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/models/category.model';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [FormsModule]
})
export class ProductComponent implements OnInit {
  categories: Category[] = [];
  product: Product = {
    id: 0,
    name: '',
    description: '',
    categories: []
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe(response => {
      console.log('Produto cadastrado com sucesso!', response);
      // Resetar o formulário após o envio
      this.product = {
        id: 0,
        name: '',
        description: '',
        categories: []
      };
    });
  }
}
