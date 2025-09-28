import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TransacaoService } from '../transacao/service';
import { Transacao } from '../transacao/model';

@Component({
  selector: 'app-rd',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rd.html',
  styleUrls: ['./rd.css'],
})
export class Rd {
  filtro: string = '';

  constructor(public transacaoService: TransacaoService) {}

  get receitas(): Transacao[] {
    return this.transacaoService
      .getTransacoes()
      .filter(
        (t) =>
          t.tipo === 'receita' &&
          t.descricao.toLowerCase().includes(this.filtro.toLowerCase())
      );
  }

  get despesas(): Transacao[] {
    return this.transacaoService
      .getTransacoes()
      .filter(
        (t) =>
          t.tipo === 'despesa' &&
          t.descricao.toLowerCase().includes(this.filtro.toLowerCase())
      );
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transacaoService.removeTransacao(id);
    }
  }

  editar(t: Transacao) {
    const novaDescricao = prompt('Editar descrição:', t.descricao);
    const novoValor = prompt('Editar valor:', t.valor.toString());
    const novaCategoria = prompt('Editar categoria:', t.categoria || '');

    if (novaDescricao !== null && novoValor !== null) {
      const atualizado: Transacao = {
        ...t,
        descricao: novaDescricao,
        valor: parseFloat(novoValor),
        categoria: novaCategoria || t.categoria,
      };
      this.transacaoService.updateTransacao(atualizado);
    }
  }
}
