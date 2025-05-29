import { Component } from '@angular/core';
import { Person } from '../person.model';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-register',
  imports: [FormsModule],
  templateUrl: './person-register.component.html',
  styleUrl: './person-register.component.css'
})
export class PersonRegisterComponent {
  person: Partial<Person> = {
    name: '',
    phone: '',
    email: '',
    address: ''
  };

  onSubmit(form?: NgForm) {
    if (form && form.valid) {
      // Aqui você pode enviar os dados para o backend ou fazer outra ação
      console.log('Pessoa cadastrada:', this.person);
      // Limpar o formulário após o envio, se desejar
      form.resetForm();
    }
  }
}
