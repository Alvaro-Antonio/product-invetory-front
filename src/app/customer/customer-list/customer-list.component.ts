import { Component } from '@angular/core';
import { Customer, Pagination } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {

  constructor(private customerService: CustomerService) {
    this.getCustomers(1);
  }

  customers: Customer[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  getCustomers(page: number): void {
    this.customerService.getCustomers(page, 15).subscribe(
      (response: Pagination<Customer>) => {
        console.log(response);
        this.customers = response.data;
        this.totalPages = Number(response.totalPages);
        this.currentPage = Number(response.currentPage);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {  
      this.getCustomers(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.getCustomers(this.currentPage - 1);
    }
  }

}