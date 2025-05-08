import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductBatch } from './product-batch.model';
import { ToastrService } from 'ngx-toastr';
import { ProductBatchService } from './productbatch.service';

@Component({
  selector: 'app-product-batch-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './product-batch-register.component.html',
  styleUrl: './product-batch-register.component.css'
})
export class ProductBatchRegisterComponent implements OnInit, AfterViewInit {
  productBatchForm: FormGroup;
  filteredProducts: Product[][] = []; // Array para armazenar os produtos filtrados para cada item

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productBatchService: ProductBatchService,
    private toastr: ToastrService
  ) {
    this.productBatchForm = this.fb.group({
      batchNumber: ['', [Validators.required,Validators.minLength(3)]],
      productItens: this.fb.array([]) // FormArray para os itens do lote
    });
  }

  ngOnInit() { 
    this.productItens.clear(); // Limpa o FormArray    
    console.log("quant " + this.productBatchForm.controls['productItens'].value.length);
    this.addProductItemToFormArray();
    this.productItens.controls.map((item) => console.log(item));

  }
   ngAfterViewInit() {
    
  }

  // Getter para acessar o FormArray de itens
  get productItens(): FormArray {
    return this.productBatchForm.get('productItens') as FormArray;
  }

  // Adiciona um novo item ao FormArray
  addProductItem(): FormGroup {
    // Adiciona um array vazio para os produtos filtrados deste item
    this.filteredProducts.push([]);

    return this.fb.group({
      productName: ['', [Validators.required, Validators.min(3)]],
      amount: [1, [Validators.required, Validators.min(1)]],
      purchasePrice: [1.00, [Validators.required, Validators.min(1)]],
      sellingPrice: [1.00, [Validators.required, Validators.min(1)]]
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
    this.productItens.at(index).get('productName')?.setValue(product.name);
    console.log('Produto selecionado:', product.id);
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
          console.log('Lote cadastrado com sucesso:', response);
          this.toastr.success('Produto cadastrado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao cadastrar lote:', error);
        }
      });
    }
  }

  checkFormValidity(): void {
    console.log('Formulário válido:', this.productBatchForm.valid);
    console.log('Erros no formulário:', this.productBatchForm.errors);

    // Verifica cada controle no FormGroup
    Object.keys(this.productBatchForm.controls).forEach(key => {
      const control = this.productBatchForm.get(key);
      if (control?.invalid) {
        console.log(`Erro no campo "${key}":`, control.errors);
      }
    });

    // Verifica os erros no FormArray (productItens)
    this.productItens.controls.forEach((group, index) => {
      if (group.invalid) {
        console.log(`Erro no item ${index}:`, group.errors);
        Object.keys((group as FormGroup).controls).forEach(field => {
          const fieldControl = group.get(field);
          if (fieldControl?.invalid) {
            console.log(`Erro no campo "${field}" do item ${index}:`, fieldControl.errors);
          }
        });
      }
    });
  }
}