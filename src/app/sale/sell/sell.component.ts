import { Component } from '@angular/core';
import { ProductItem } from '../../product/product-item/product.item.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments';
import { ProductItemService } from '../../product/product-item/product-item.service';
import { ItemSale } from '../item-sale/item-sale.model';
import { ModalComponent } from '../../utils/modal/modal.component';
import { CustomerService } from '../../customer/customer.service';
import { Customer } from '../../customer/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PaymentMethod } from './sell.paymente.enum';
import { Sell } from './sell.model';
import { SaleService } from '../sale.service';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  imports: [FormsModule, CommonModule, ModalComponent, ReactiveFormsModule,],
})
export class SellComponent {

  mostrarModal = false;
  // Busca de produtos
  searchQuery: string = '';
  filteredProducts: ProductItem[] = [];
  selectedProduct: ProductItem | null = null;
  quantity: number = 1;
  saleProducts: ItemSale[] = [];

  //Register of custumer
  customerSearchQuery: string = '';
  filteredCustomers: Customer[] = []; // Substitua 'any' pelo tipo correto de cliente
  selectedCustomer: Customer | null = null; // Substitua 'any' pelo tipo correto

  selectedPaymentMethod: PaymentMethod = PaymentMethod.PENDING; // Inicializa com o método de pagamento padrão
  paymentMethods : PaymentMethod = PaymentMethod.CASH; 

  paymentLocked: PaymentMethod = PaymentMethod.PENDING; // Método de pagamento bloqueado inicialmente
  
  API_IMAGE_URL = environment.imageBaseUrl;

  customerFormGroup: FormGroup;

  sellFormGroup: FormGroup;

  constructor(
    private fbCustomer: FormBuilder,
    private fbSell: FormBuilder,
    private productItemService: ProductItemService,
    private customerService: CustomerService , 
    private saleService: SaleService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.customerFormGroup = this.fbCustomer.group({
      name : ['', [Validators.required,Validators.minLength(3)]],
      phone: ['',[Validators.required,]],
      email: ['',[Validators.email]],
      address: ['',[Validators.required]], 
    });

    this.sellFormGroup = this.fbSell.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      paymentMethod: [this.selectedPaymentMethod, Validators.required],
      itemProduct: [null, Validators.required], // Inicializa o produto como nulo
      customer: [null, Validators.required], // Inicializa o cliente como nulo
    });
  }

  // Busca produtos pelo nome
  onSearchProduct(): void {
    if (this.searchQuery.trim() === '' || this.searchQuery.length < 3) {
      this.filteredProducts = [];
      return;
    }
    console.log('Buscando produtos com o nome:', this.searchQuery);
    this.productItemService.getProductsItemByName(this.searchQuery).subscribe((products: ProductItem[]) => {
      this.filteredProducts = products;
    });
  }

  
  // Adiciona o produto selecionado à lista de venda
  addProductToSale(): void {
    if (!this.selectedProduct || this.quantity < 1) {
      alert('Selecione um produto e insira uma quantidade válida.');
      return;
    }
  
    // Verifica se o produto já existe na lista de venda
    const existingProduct = this.saleProducts.find(
      (itemSale) => itemSale.productItem.id === this.selectedProduct!.id
    );
  
    if (existingProduct) {
      // Incrementa a quantidade do produto existente
      existingProduct.quantity += this.quantity;
      existingProduct.totalPrice = existingProduct.quantity * existingProduct.unitPrice;
    } else {
      // Adiciona um novo item à lista de venda
      this.saleProducts.push({
        id: 0, // ID será gerado no backend
        productItem: this.selectedProduct, // Referência ao ProductItem
        quantity: this.quantity,
        unitPrice: this.selectedProduct.sellingPrice, // Preço unitário
        totalPrice: this.quantity * this.selectedProduct.sellingPrice, // Calcula o preço total
        discount: 0, // Inicializa o desconto como 0
        
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
      (total, product) => total + product.totalPrice,
      0
    );
  }

  // Finaliza a venda
  finalizeSale(): void {
    if (this.saleProducts.length === 0) {
      alert('Adicione pelo menos um produto à venda.');
      return;
    }

    const sell : Sell = {
      id: 0, // ID será gerado no backend
      date: new Date(), // Data atual
      total: this.calculateTotal(), // Total da venda
      paymentMethod: this.selectedPaymentMethod, // Método de pagamento selecionado
      customer: this.selectedCustomer ?? { id: 0, person: { id: 0, name: '', phone: '', email: '', address: '', createdAt: new Date(), updatedAt: null }, vip: false }, // Cliente selecionado ou valor padrão
      items: this.saleProducts.map(item => ({
        id: 0, // ID será gerado no backend
        productItem: item.productItem, // Referência ao ProductItem
        quantity: item.quantity,
        unitPrice: item.unitPrice, // Preço unitário
        totalPrice: item.totalPrice, // Preço total
        discount: item.discount, // Desconto aplicado
      })),
    };


    // Aqui você pode implementar a lógica para enviar os dados da venda ao backend
    console.log('Venda finalizada:', this.saleProducts);
    
   

    this.saleService.createSale(sell).subscribe({
      next: (response) => {
        console.log('Venda criada com sucesso!', response);
        this.toastr.success('Venda finalizada com sucesso!', 'Sucesso');
        this.router.navigate(['/sell']);
      },
      error: (error) => {
        console.error('Erro ao criar venda:', error);
        this.toastr.error('Erro ao criar venda', 'Erro');
      }
    });

    this.saleProducts = []; // Limpa a lista de venda após finalizar
  }

  // Seleciona um produto da lista de busca
  selectProduct(product: ProductItem): void {
    if(product.amountItemProduct.amountFinal <= 0) {
      console.log('Produto sem estoque:', product);
      this.toastr.warning('Sem estoque para este item!', 'Sem Estoque');
    }else{
      this.selectedProduct = product;
      this.filteredProducts = []; // Limpa a lista de busca após a seleção
      this.searchQuery = ''; // Limpa o campo de busca
    }
  }

  onSearchCustomer(): void {
    if (this.customerSearchQuery.trim() === '' || this.customerSearchQuery.length < 3) {
      this.filteredCustomers = [];
      return;
    }
  
    this.customerService.getCustomerByName(this.customerSearchQuery).subscribe((customers: Customer[]) => {
      this.filteredCustomers = customers;
    });
  }
  
  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.filteredCustomers = [];
    this.customerSearchQuery = customer.person.name; // Atualiza o campo de input com o nome do cliente selecionado
  }


  openModal() {
    console.log('Abrindo modal');
    this.mostrarModal = true;
  }

   onSubmitCustomer() {
      if (this.customerFormGroup && this.customerFormGroup.valid) {
        const customer: Customer = {
          id: 0, // ID será gerado no backend
          person: {
            id: 0, // ID será gerado no backend
            name: this.customerFormGroup.value.name,
            phone: this.customerFormGroup.value.phone,
            email: this.customerFormGroup.value.email,
            address: this.customerFormGroup.value.address,
            createdAt: new Date(), // Data de criação
            updatedAt: null, // Data de atualização
          },
          vip: false, // Inicializa como não VIP
        };
      
        this.customerService.createCustomer(customer).subscribe({
          next: (response) => {
            console.log('Cliente cadastrado com sucesso!', response);
            this.toastr.success('Cliente cadastrado com sucesso!', 'Sucesso');
            this.router.navigate(['/customer']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar cliente:', error);
            this.toastr.error('Erro ao cadastrar cliente', 'Erro');
          }
        });
      } else {
        console.error('Formulário inválido');
        this.toastr.error('Formulário inválido', 'Erro');
        // Exibe uma mensagem de erro se o formulário não for válido       
  
        this.customerFormGroup.reset();
      }
    }

    get allPayments(): string[] {
      return Object.values(PaymentMethod).filter(value => typeof value === 'string') as string[];
    }

}