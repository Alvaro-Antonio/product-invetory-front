import { HttpClient } from "@angular/common/http";
import { Balance } from "./balance.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroments";



@Injectable({
    providedIn: 'root'
  })
  export class BalanceService {  
     
    private apiUrl = environment.apiUrl + "balance"; 
  
    constructor(private http: HttpClient) {}
  
    getBalanceAtual(): Observable<Balance> {
        return this.http.get<Balance>(this.apiUrl +`/year/${new Date().getFullYear()}`);
    }
  
  }