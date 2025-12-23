import { Component } from '@angular/core';
import { Category, CategoryRegisterDTO } from '../models/category.model';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-register',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './category-register.component.html',
  styleUrl: './category-register.component.css'
})
export class CategoryRegisterComponent {

  category: CategoryRegisterDTO = {
    name: '',
    description: ''
  };

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService) { }

  onSubmit() {
    this.categoryService.createCategory(this.category).subscribe(
      (response) => {
        this.toastr.success('Categoria cadastrada com sucesso!');
        this.category = { name: '', description: '' }; // Reset form
      }
    );
  } 
}