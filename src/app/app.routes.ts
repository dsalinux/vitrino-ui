import { Routes } from '@angular/router';
import { App } from './app';
import { FluxoList } from  './component/fluxo-caixa/fluxo-list/fluxo-list';
import { Dashboard } from './component/dashboard/dashboard';
import { UsuarioList } from './component/gerenciar-usuarios/usuario-list/usuario-list';
import { Teste } from './component/teste/teste';
import { TesteForm } from './component/teste-form/teste-form';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'fluxo-caixa', component: FluxoList },
    { path: 'usuarios', component: UsuarioList},
    { path: 'teste', component: Teste},
    { path: 'testeForm', component: TesteForm},
];
