export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria?: string;  
  data: Date;
}
