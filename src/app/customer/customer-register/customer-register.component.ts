import { Component } from '@angular/core';
import { Customer } from '../customer.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-register',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent {
  customer: Customer = {
    id: 0,
    vip: false,
    person: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      address: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    this.customerService.createCustomer(this.customer).subscribe(
      (response) => {
        this.toastr.success('Cliente cadastrado com sucesso!');
        console.log('Cliente cadastrado:', response);

        // Resetar o formulário
        this.customer = {
          id: 0,
          vip: false,
          person: {
            id: 0,
            name: '',
            phone: '',
            email: '',
            address: '',
            createdAt: new Date(),
            updatedAt: null
          }
        };
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar cliente.');
        console.error('Erro:', error);
      }
    );
  }
}
