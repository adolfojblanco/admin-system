import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../services/account.service';
import { Supplier } from '../../../../models/Supplier';
import { Expense, MovemetType } from '../../../../models/Expense';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-acounting-dialog',
  templateUrl: './acounting-dialog.component.html',
  styles: ``
})
export class AcountingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Expense) {
    if (data) {
      this.expenseForm.reset(data)
      this.expenseForm.controls['supplier'].setValue(data.supplier.id)
      this.titleForm = 'Edición de categoria';
    }
  }

  public fb = inject(FormBuilder);
  public accountService = inject(AccountService)
  public suppliers: Supplier[] = [];
  public titleForm: string = 'Nuevo Gasto'
  public textButton: string = 'Guardar'
  public types!: MovemetType;


  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier() {
    this.accountService.getSuppliers().subscribe((res) => {
      this.suppliers = res;
    })
  }

  submit() {
    console.log(this.expenseForm.value)
  }

  isValid(name: string) { }

  public expenseForm: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    type: [, [Validators.required]],
    status: [, [Validators.required]],
    amount: [, [Validators.required, Validators.min(0)]],
    comment: [''],
    supplier: [, [Validators.required]],
  })

}
