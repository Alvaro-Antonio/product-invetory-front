import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductBatch } from './product-batch.model';
import { ToastrService } from 'ngx-toastr';
import { ProductBatchService } from './productbatch.service';
import { Router } from '@angular/router';
import { NgxCurrencyConfig, NgxCurrencyDirective } from "ngx-currency";

@Component({
  selector: 'app-product-batch-register',
  imports: [ReactiveFormsModule, FormsModule, NgxCurrencyDirective],
  templateUrl: './product-batch-register.component.html',
  styleUrl: './product-batch-register.component.css'
})
export class ProductBatchRegisterComponent implements OnInit, AfterViewInit {
  productBatchForm: FormGroup;
  filteredProducts: Product[][] = []; // Array para armazenar os produtos filtrados para cada item
  inputNames : string [] = []; // Array para armazenar os nomes dos produtos selecionados

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private productBatchService: ProductBatchService,
    private toastr: ToastrService
  ) {
    this.productBatchForm = this.fb.group({
      orderNumber: ['', [Validators.required, Validators.minLength(3)]],
      productItens: this.fb.array([]),
    }, { validators: purchasePriceValidator() }); 
  }

  ngOnInit() { 
    this.productItens.clear(); // Limpa o FormArray    
    this.addProductItemToFormArray();
    console.log("quant " + this.productBatchForm.controls['productItens'].value.length);    
  }

  currencyOptions: NgxCurrencyConfig = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left',
    allowZero: false,
    suffix: '',
    nullable: false
  };

  ngAfterViewInit() {
   
  }
  get productItens(): FormArray {
    return this.productBatchForm.get('productItens') as FormArray;
  }

  // Adiciona um novo item ao FormArray
  addProductItem(): FormGroup {
    // Adiciona um array vazio para os produtos filtrados deste item
    this.filteredProducts.push([]);

    return this.fb.group({
      product: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
      purchasePrice: [null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      sellingPrice: [null, [Validators.required, Validators.min(1)]]
    });
  }

  addProductItemToFormArray(): void {
    this.productItens.push(this.addProductItem());
    this.filteredProducts.push([]); // Adiciona um array vazio para os produtos filtrados deste novo item
  }

  // Remove um item do FormArray pelo índice
  removeProductItem(index: number): void {
    this.productItens.removeAt(index);
    this.filteredProducts.splice(index, 1); // Remove os produtos filtrados correspondentes
  }

  // Simula a busca de produtos (substitua por uma chamada ao backend)
  onProductSearch(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;

    this.inputNames[index] = searchValue;

   if (searchValue.length > 2) {
    this.productService.getProductsByName(searchValue.toString())
    .subscribe((data: Product[]) => {
      // Filtra os produtos com base na consulta
      this.filteredProducts[index] = data.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    }
  }

  // Seleciona um produto da lista de autocomplete
  selectProduct(product: Product, index: number): void {
    this.productItens.at(index).get('product')?.setValue(product);
  
    this.inputNames[index] = product.name;

    this.filteredProducts[index] = []; // Limpa a lista de sugestões
  }

  // Submete o formulário
  onSubmit(): void {
    if (this.productBatchForm.valid) {
      const productBatchData : ProductBatch = this.productBatchForm.value;

      console.log('Dados do lote:', productBatchData);

      this.productBatchService.createProductBatch(productBatchData)
      .subscribe({
        next: (response) => {
          this.toastr.success('Lote cadastrado com sucesso!');
            this.productBatchForm.reset();             
            
            this.router.navigate(['/product-list']);

        },
        error: (error) => {
          console.error('Erro ao cadastrar lote:', error);
        }
      });
    }
  }

}

// Custom validator to ensure purchasePrice is not less than sellingPrice
export function purchasePriceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const purchasePrice = control.get('purchasePrice')?.value;
    const sellingPrice = control.get('sellingPrice')?.value;

    if (purchasePrice !== null && sellingPrice !== null && purchasePrice < sellingPrice) {
      const toastr = control.get('purchasePrice')?.root.get('toastrService')?.value;
      if (toastr) {
        toastr.error('O preço de compra não pode ser menor que o preço de venda.');
      }
      return { purchasePriceLessThanSellingPrice: true };
    }
    return null;
  };
}
