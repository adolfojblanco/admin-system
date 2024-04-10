import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styles: ``
})
export class SupplierDialogComponent {

  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  public toast = inject(HotToastService);
  public titleForm = 'Nuevo Proveedor:';
  public textButton = 'Guardar';


  supplierForm: FormGroup = this.fb.group({
    id: [],
    name: [, [Validators.required, Validators.minLength(3)]],
    is_active: [true]
  })

  submit() {
    this.accountService.newSupplier(this.supplierForm.value).subscribe(res =>
      this.toast.success(`${this.supplierForm.controls['name'].value}, agregado correctamente`))
  }

  isValid(field: string) {
    return (
      this.supplierForm.controls[field].errors &&
      this.supplierForm.controls[field].touched
    );
  }



}

