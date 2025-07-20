import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductDTO, Product } from './product.model';
import { environment } from '../../enviroments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = environment.apiUrl + 'product';

  constructor(private http: HttpClient) {}

  createProduct(formData: FormData): Observable<Product> {
    console.log("chegou aqui");
    return this.http.post<Product>(this.apiUrl, formData);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?name=${name}`);
  }

}