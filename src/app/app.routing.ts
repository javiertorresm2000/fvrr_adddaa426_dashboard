// Importar modulos
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';

const appRoutes: Routes = [
    // { path: '', component: AppComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'pedidos', component: PedidosComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);