import { Component } from '@angular/core';

@Component({
  selector: 'app-person-list',
  imports: [],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {
  people: any[] = []; // This should be replaced with the actual type of person

  constructor() {
    // Simulate fetching data from a service
    this.people = [
      { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
    ];
  }
}
