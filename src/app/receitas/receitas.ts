import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransacaoService } from '../transacao/service';
import { Transacao } from '../transacao/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './receitas.html',
  styleUrls: ['./receitas.css'],
})
export class Receitas {
  descricao: string = '';
  valor: number = 0;
  categoria: string = '';

  categorias: string[] = ['Salario', 'Freelance', 'Investimento', 'Outros'];

  constructor(private transacaoService: TransacaoService) {}

  salvarReceita() {
    if (!this.descricao || this.descricao.trim() === '') {
      alert('Precisa colocar descrição');
      return;
    }

    const novaTransacao: Transacao = {
      id: 0,
      descricao: this.descricao,
      valor: this.valor,
      tipo: 'receita',
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
