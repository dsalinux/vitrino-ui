import { Forma_Pagamento } from "./forma-pagamento.model";

export interface Fluxo_Caixa {
  id: number;
  desricao: string;
  nome: string;
  dataRegistro: Date;
  preco: number;
  tipoTransacao: string;
  formaPagamento: Forma_Pagamento;
}