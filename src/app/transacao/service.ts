import { Injectable } from '@angular/core';
import { Transacao } from './model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransacaoService {
  private transacoesSubject = new BehaviorSubject<Transacao[]>([]);
  transacoes$ = this.transacoesSubject.asObservable();

  private idCounter = 1;

  getTransacoes(): Transacao[] {
    return this.transacoesSubject.value;
  }

  addTransacao(t: Transacao) {
    const novaTransacao: Transacao = {
      ...t,
      id: this.idCounter++,
    };

    const atualizadas = [...this.transacoesSubject.value, novaTransacao];
    this.transacoesSubject.next(atualizadas);
  }

  removeTransacao(id: number) {
    const current = this.transacoesSubject.value;
    const updated = current.filter((t) => t.id !== id);
    this.transacoesSubject.next(updated);
  }

  updateTransacao(updated: Transacao) {
    const current = this.transacoesSubject.value;
    const index = current.findIndex((t) => t.id === updated.id);
    if (index !== -1) {
      current[index] = { ...updated };
      this.transacoesSubject.next([...current]);
    }
  }
}
