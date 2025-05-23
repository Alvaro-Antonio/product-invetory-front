import { Component } from '@angular/core';
import { ProductItem } from '../../product/product-item/product.item.model';
import { ProductService } from '../../product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../product/product.model';
import { environment } from '../../../enviroments';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  imports: [FormsModule, CommonModule],
})
export class SellComponent {
  searchQuery: string = '';
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  quantity: number = 1;
  saleProducts: { name: string; quantity: number; sellingPrice: number }[] = [];

  API_IMAGE_URL = environment.imageBaseUrl;

  constructor(private productService: ProductService) {}

  // Busca produtos pelo nome
  onSearchProduct(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = [];
      return;
    }

    this.productService.getProductsByName(this.searchQuery).subscribe((products) => {
      this.filteredProducts = products;
    });
  }

  // Seleciona um produto da lista de busca
  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.filteredProducts = []; // Limpa a lista de busca após a seleção
    this.searchQuery = ''; // Limpa o campo de busca
  }

  // Adiciona o produto selecionado à lista de venda
  addProductToSale(): void {
    if (!this.selectedProduct || this.quantity < 1) {
      return;
    }

    const existingProduct = this.saleProducts.find(
      (p) => p.name === this.selectedProduct!.name
    );

    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      this.saleProducts.push({
        name: this.selectedProduct.name,
        quantity: this.quantity,
        sellingPrice: 10
      });
    }

    // Reseta o produto selecionado e a quantidade
    this.selectedProduct = null;
    this.quantity = 1;
  }

  // Remove um produto da lista de venda
  removeProductFromSale(index: number): void {
    this.saleProducts.splice(index, 1);
  }

  // Calcula o total da venda
  calculateTotal(): number {
    return this.saleProducts.reduce(
      (total, product) => total + product.quantity * product.sellingPrice,
      0
    );
  }

  // Finaliza a venda
  finalizeSale(): void {
    // Aqui você pode implementar a lógica para enviar os dados da venda ao backend
    console.log('Venda finalizada:', this.saleProducts);
    alert('Venda finalizada com sucesso!');
    this.saleProducts = []; // Limpa a lista de venda após finalizar
  }
}