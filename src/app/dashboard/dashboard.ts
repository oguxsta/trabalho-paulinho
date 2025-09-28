import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transacao } from '../transacao/model';
import { TransacaoService } from '../transacao/service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  transacoes: Transacao[] = [];

  receitaTotal = 0;
  despesaTotal = 0;

  constructor(private transacaoService: TransacaoService) {}

  ngOnInit(): void {
    this.transacaoService.transacoes$.subscribe((transacoes) => {
      this.transacoes = transacoes;
      this.calcularTotais();
    });
  }

  calcularTotais() {
    this.receitaTotal = this.transacoes
      .filter((t) => t.tipo === 'receita')
      .reduce((acc, t) => acc + t.valor, 0);

    this.despesaTotal = this.transacoes
      .filter((t) => t.tipo === 'despesa')
      .reduce((acc, t) => acc + t.valor, 0);
  }

  get saldoFinal(): number {
    return this.receitaTotal - this.despesaTotal;
  }
}
