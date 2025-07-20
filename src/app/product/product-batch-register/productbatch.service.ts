import { Injectable } from '@angular/core';
import { ProductBatch } from './product-batch.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../enviroments';


@Injectable({
    providedIn: 'root'
})
export class ProductBatchService {

    private apiUrl = environment.apiUrl + 'product-batch';

    constructor(private http: HttpClient) { }

    createProductBatch(productBatchData: ProductBatch): Observable<ProductBatch> {
        const url = this.apiUrl;
        return this.http.post<ProductBatch>(url, productBatchData);
    }
}