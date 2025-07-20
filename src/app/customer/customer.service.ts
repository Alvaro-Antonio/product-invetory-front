import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';
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
}