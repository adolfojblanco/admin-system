import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../../../models/User';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: ``,
})
export class UserDialogComponent {
  private userService = inject(UsersService);
  private fb = inject(FormBuilder);
  public toast = inject(HotToastService);
  public titleForm = 'Nuevo Usuario:';
  public textButton = 'Guardar';
  public user!: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {
    if (data) {
      this.userForm.reset(data);
      this.userForm.controls['password'].reset();
      this.titleForm = 'Edición de Usuario:';
      this.textButton = 'Editar';
    }
  }

  public userForm: FormGroup = this.fb.group({
    id: [],
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    is_staff: [false],
    is_active: [false],
  });

  submit() {
    if (this.userForm.invalid) {
      this.toast.error('Todos los campos son obligatorios');
      return;
    }

    if (this.userForm.controls['id'].value) {
      this.userService
        .editUser(this.userForm.value)
        .subscribe((res) =>
          this.toast.success(`Usuario editado correctamente`)
        );
    } else {
      this.userService
        .newUser(this.userForm.value)
        .subscribe((res) => this.toast.success(`Usuario creado correctamente`));
    }
  }

  isValid(field: string) {
    return (
      this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched
    );
  }
}
