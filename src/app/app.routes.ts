import { Routes } from '@angular/router';
import { FluxoCaixa } from './component/fluxo-caixa/fluxo-caixa';
import { Dashboard } from './component/dashboard/dashboard';
import { UsuarioList } from './component/gerenciar-usuarios/usuario-list/usuario-list';
import { Teste } from './component/teste/teste';
import { TesteForm } from './component/teste-form/teste-form';
import { ClienteList } from './component/gerenciar-clientes/cliente-list/cliente-list';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'fluxo-caixa', component: FluxoCaixa },
    { path: 'usuarios', component: UsuarioList},
    { path: 'clientes', component: ClienteList},
    { path: 'teste', component: Teste},
    { path: 'testeForm', component: TesteForm},
];
