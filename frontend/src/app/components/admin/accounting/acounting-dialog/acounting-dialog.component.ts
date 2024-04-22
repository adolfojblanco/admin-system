import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../services/account.service';
import { Supplier } from '../../../../models/Supplier';
import { MovemetType } from '../../../../models/Expense';

@Component({
  selector: 'app-acounting-dialog',
  templateUrl: './acounting-dialog.component.html',
  styles: ``
})
export class AcountingDialogComponent implements OnInit {

  constructor() {
    
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
      console.log(res)
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
    status: [false, [Validators.required]],
    amount: [, [Validators.required, Validators.min(0)]],
    comment: [],
    supplier: [[Validators.required]],
  })

}
