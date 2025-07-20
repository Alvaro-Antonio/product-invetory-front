import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductItem } from './product.item.model';
import { environment } from '../../../enviroments';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {
  
  private apiUrl = environment.apiUrl + 'product-item';

  constructor(private http: HttpClient) {}

  
  getProductsItem(): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(this.apiUrl);
  }

  getProductItemById(id: number): Observable<ProductItem> {
    return this.http.get<ProductItem>(`${this.apiUrl}/${id}`);
  }

  getProductsItemByName(name: string): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(`${this.apiUrl}/search?name=${name}`);
  }

}