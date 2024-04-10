import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``,
})
export class UsersComponent implements OnInit {
  private dialog = inject(MatDialog);
  private userService = inject(UsersService);
  public users!: User[];

  public displayedColumns: string[] = [
    'username',
    'first_name',
    'last_name',
    'is_staff',
    'is_active',
    'actions',
  ];
  public dataSource = this.users;

  @Input() user!: User;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource = res;
    });
  }

  /** New user */
  newUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  /** edit Usuario */
  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadUsers();
    });
  }
}
