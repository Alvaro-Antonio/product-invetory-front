import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Person } from "./person.model"; // Certifique-se de que o caminho está correto
import { environment } from "../../enviroments";



@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
   
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

    createPerson(formData: FormData) {
        return this.http.post(`${this.apiUrl}/person`, formData);
    }

}