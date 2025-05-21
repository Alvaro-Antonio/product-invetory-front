import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { environment } from '../../../enviroments';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  API_IMAGE_URL = environment.imageBaseUrl;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => (this.products = products));
  }
}
