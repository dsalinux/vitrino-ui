import { Permissao } from "./permissao.model";

export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    dataDesativacao?: Date; 
    permissoes?: Permissao[];
}