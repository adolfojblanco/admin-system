import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: ``,
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private toast = inject(HotToastService);
  public user?: User;

  ngOnInit(): void { }

  loadUser() {
    this.authService.getAuthUser().subscribe((res) => {
      this.user = res;
    });
  }

  public sidebarItems = [
    { label: 'Inicio', icon: 'home', url: './' },
    { label: 'POS', icon: 'point_of_sales', url: './pos' },
    { label: 'Caja', icon: 'euro', url: './cashbox' },
    { label: 'Categorias', icon: 'category', url: './inventory/categories' },
    { label: 'Gastos', icon: 'payments', url: './accounting' },
    { label: 'Mesas', icon: 'table_bar', url: './tables' },
    { label: 'Productos', icon: 'inventory_2', url: './inventory/products' },
    { label: 'Usuarios', icon: 'groups', url: './users' },
  ];

  logout() {
    this.authService.logout();
  }
}
