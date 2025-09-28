import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransacaoService } from '../transacao/service';
import { Transacao } from '../transacao/model';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './relatorio.html',
  styleUrls: ['./relatorio.css'],
})
export class Relatorio implements OnInit {
  transacoes: Transacao[] = [];

  constructor(private transacaoService: TransacaoService) {}

  ngOnInit() {
    // Assina o BehaviorSubject para atualizar automaticamente
    this.transacaoService.transacoes$.subscribe(t => {
      this.transacoes = t;
    });
  }

  get saldoMensal(): number {
    const receitas = this.transacoes
      .filter(t => t.tipo?.toLowerCase() === 'receita')
      .reduce((sum, r) => sum + (r.valor || 0), 0);

    const despesas = this.transacoes
      .filter(t => t.tipo?.toLowerCase() === 'despesa')
      .reduce((sum, d) => sum + (d.valor || 0), 0);

    return receitas - despesas;
  }

  get mediaDespesas(): number {
    const despesas = this.transacoes.filter(t => t.tipo?.toLowerCase() === 'despesa');
    if (!despesas.length) return 0;
    const total = despesas.reduce((sum, d) => sum + (d.valor || 0), 0);
    return total / despesas.length;
  }

  get despesasPorCategoria(): { categoria: string; percentual: number }[] {
    const despesas = this.transacoes.filter(t => t.tipo?.toLowerCase() === 'despesa');
    if (!despesas.length) return [];

    const total = despesas.reduce((sum, d) => sum + (d.valor || 0), 0);
    const categoriasMap: { [key: string]: number } = {};

    despesas.forEach(d => {
      const cat = d.categoria || 'Outros';
      categoriasMap[cat] = (categoriasMap[cat] || 0) + (d.valor || 0);
    });

    return Object.keys(categoriasMap).map(cat => ({
      categoria: cat,
      percentual: total === 0 ? 0 : (categoriasMap[cat] / total) * 100
    }));
  }
}
