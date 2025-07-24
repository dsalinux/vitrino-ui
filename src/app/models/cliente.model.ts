import { Permissao } from "./permissao.model";

export interface Cliente {
    id?: number;
    nome: string;
    sobrenome?: string;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
    dataNascimento: Date;
    dataRegistro: Date;
    dataBloqueio?: Date; 
    permissoes?: Permissao[];
}