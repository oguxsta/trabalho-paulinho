import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransacaoService } from '../transacao/service';
import { Transacao } from '../transacao/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './despesas.html',
  styleUrls: ['./despesas.css'],
})
export class Despesas {
  descricao: string = '';
  valor: number = 0;
  categoria: string = '';

  categorias: string[] = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Lazer',
    'Outros',
  ];

  constructor(private transacaoService: TransacaoService) {}

  salvarDespesa() {
    const novaTransacao: Transacao = {
      id: 0,
      descricao: this.descricao,
      valor: this.valor,
      tipo: 'despesa',
      categoria: this.categoria,
      data: new Date(),
    };

    this.transacaoService.addTransacao(novaTransacao);

    console.log('Transação salva:', novaTransacao);

    this.cancelar();
  }
  cancelar() {
    this.descricao = '';
    this.valor = 0;
    this.categoria = '';
  }
}
