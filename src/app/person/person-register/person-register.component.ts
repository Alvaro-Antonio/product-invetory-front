import { Component } from '@angular/core';
import { PersonCreate } from '../person.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './person-register.component.html',
  styleUrl: './person-register.component.css'
})
export class PersonRegisterComponent {

  personFormGroup : FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private personService: PersonService
  ) {
    this.personFormGroup = this.fb.group({
      name : ['', [Validators.required,Validators.minLength(3)]],
      phone: ['',[Validators.required,]],
      email: ['',[Validators.email]],
      address: ['',[Validators.required]], 
    });
  }

  onSubmit() {
    if (this.personFormGroup && this.personFormGroup.valid) {
      const person: PersonCreate = {
        name: this.personFormGroup.value.name,
        phone: this.personFormGroup.value.phone,
        email: this.personFormGroup.value.email,
        address: this.personFormGroup.value.address,
      };

      this.personService.createPerson(person).subscribe({
        next: (response) => {
          console.log('Pessoa cadastrada com sucesso!', response);
          this.toastr.success('Pessoa cadastrada com sucesso!', 'Sucesso');
          this.router.navigate(['/person']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar pessoa:', error);
          this.toastr.error('Erro ao cadastrar pessoa', 'Erro');
        }
      });
    } else {
      console.error('Formulário inválido');
      this.toastr.error('Formulário inválido', 'Erro');
      // Exibe uma mensagem de erro se o formulário não for válido       

      this.personFormGroup.reset();
    }
  }
}
