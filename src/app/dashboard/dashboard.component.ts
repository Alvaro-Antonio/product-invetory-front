import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  currentYear = new Date().getFullYear();
  value = '205762,52';
  recebido = '205762,52';
  lucro = '205762,52';

}
