import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../usuarios/usuarios.module').then((m) => m.UsuariosPageModule),
      },
      {
        path: 'contatos',
        loadChildren: () =>
          import('../contatos/contatos.module').then((m) => m.ContatosPageModule),
      },
      { path: '', redirectTo: '/tabs/usuarios', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/usuarios', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
