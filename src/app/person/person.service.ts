import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Person, PersonCreate } from "./person.model"; // Certifique-se de que o caminho está correto
import { environment } from "../../enviroments";



@Injectable({
  providedIn: 'root'
})
export class PersonService {  
   
  private apiUrl = environment.apiUrl + "person"; 

  constructor(private http: HttpClient) {}

    createPerson(person: PersonCreate): Observable<Person> {
        return this.http.post<Person>(`${this.apiUrl}/`, person);
    }

}