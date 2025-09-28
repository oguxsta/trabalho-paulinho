import { Routes } from '@angular/router';
import { Dashboard } from './app/dashboard/dashboard';
import { Rd } from './app/rd/rd';
import { Relatorio } from './app/relatorio/relatorio';
import { Receitas } from './app/receitas/receitas';
import { Despesas } from './app/despesas/despesas';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'rd', component: Rd },
  { path: 'relatorio', component: Relatorio },
  { path: 'receitas', component: Receitas },
  { path: 'despesas', component: Despesas },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
