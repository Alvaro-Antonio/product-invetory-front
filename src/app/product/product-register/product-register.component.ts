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
    image : new File([], ''),
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

      const formData = new FormData();

      
      // Remove a imagem do objeto para evitar duplicação na serialização
      const productCopy = { ...this.product };
      delete productCopy.image;


      // Adiciona o restante dos dados como JSON (como string)
  
      formData.append('name', this.product.name);
      formData.append('description', this.product.description);
      // Adiciona o arquivo da imagem
      if (this.product.image) {
        formData.append('image', this.product.image);
        console.log("setou imagem", this.product.image);
      }
      formData.append('categories', JSON.stringify(this.product.categories));
      console.log(formData);

      this.productService.createProduct(formData).subscribe(response => {
        console.log('Produto cadastrado com sucesso!', response);
        this.toastr.success('Produto cadastrado com sucesso!');
        // Resetar o formulário após o envio
        this.product = {
          name: '',
          description: '',
          image: new File([], ''),
          categories: []
        };
      });
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.product.image = input.files[0];
      }
    }
}
