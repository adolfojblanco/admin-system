import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DesktopComponent } from './desktop/desktop.component';
import { PosModule } from './pos/pos.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DesktopComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((u) => u.UsersModule),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./inventory/inventory.module').then((i) => i.InventoryModule),
      },
      {
        path: 'accounting',
        loadChildren: () =>
          import('./accounting/accounting.module').then((a) => a.AccountingModule),
      },
      {
        path: 'pos',
        loadChildren: () =>
          import('./pos/pos.module').then((p) => p.PosModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/admin',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
