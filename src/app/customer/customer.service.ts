import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, Pagination } from './customer.model';
import { environment } from '../../enviroments';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = environment.apiUrl + 'customer';

  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  getCustomerByName(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/search?name=${name}`);
  }

  getCustomers(page: number, limit: number): Observable<Pagination<Customer>> {
    return this.http.get<Pagination<Customer>>(`${this.apiUrl}/paginated?page=${page}&limit=${limit}`);
  }
}