import { Component, OnInit } from '@angular/core';
import { BalanceService } from './balance.service';
import { Balance } from './balance.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  balance: Balance | null = null;

  constructor(private balanceService: BalanceService) {}

  getBalanceAtual(): void {
    this.balanceService.getBalanceAtual()
      .subscribe((data: Balance) => {
        this.balance = data;
        console.log(this.balance);
      });
  }

  ngOnInit(): void {
    this.getBalanceAtual();
  }

  // Usando getters para garantir que os valores sejam atualizados dinamicamente
  get currentYear(): number {
    return this.balance ? this.balance.year : new Date().getFullYear();
  }

  get value(): string {
    return this.balance ? this.balance.totalInvested.toFixed(2) : '0.00';
  }

  get recebido(): string {
    return this.balance ? this.balance.totalSpent.toFixed(2) : '0.00';
  }

  get lucro(): string {
    return this.balance ? this.balance.profit.toFixed(2) : '0.00';
  }
}
