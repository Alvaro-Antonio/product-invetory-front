import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../enviroments";
import { Sell } from "./sell/sell.model";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'
  })
  export class SaleService {
    
    private apiUrl = environment.apiUrl + 'sell';
  
    constructor(private http: HttpClient) {}
  
    createSale(sell: Sell): Observable<Sell> {
      return this.http.post<Sell>(`${this.apiUrl}/`, sell);
    }
  
  }