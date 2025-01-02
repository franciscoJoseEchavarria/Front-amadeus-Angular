import { Routes } from '@angular/router';

import path from 'node:path';
import { IndexComponent } from './pages/index/index.component';
import { DestinoComponent } from './pages/destino/destino.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { TarjetasComponent } from './pages/tarjetas/tarjetas.component';
import { Component } from '@angular/core';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'destino', component: DestinoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'tarjetas', component: TarjetasComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
];
