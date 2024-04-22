import { Component, inject, OnInit } from '@angular/core';
import { Expense, MovemetType, StatusType } from '../../../models/Expense';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../../services/account.service';
import { AcountingDialogComponent } from './acounting-dialog/acounting-dialog.component';
import { SupplierDialogComponent } from './supplier-dialog/supplier-dialog.component';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styles: ``
})
export class AccountingComponent implements OnInit {
  private dialog = inject(MatDialog);
  private accountServices = inject(AccountService)

  public totalOut: number = 0;
  public totalIn: number = 0
  public totalPending: number = 0;

  public expenses: Expense[] = [];
  public dataSource = this.expenses;
  public displayedColumns: string[] = ['name', 'supplier', 'type', 'amount', 'status', 'actions'];


  ngOnInit(): void {
    this.loadExpenses()
  }

  loadExpenses() {
    this.accountServices.getExpenses().subscribe((res) => (
      this.expenses = res,
      this.dataSource = res,
      this.calculateExpenses(this.expenses),
      this.calculatePending(this.expenses)
    ));
  }

  /** Add new Expense */
  newExpense() {
    const dialogRef = this.dialog.open(AcountingDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {

      }
    })
  }

  /** Edición de gastos */
  detailExpense(expense: Expense) {
    const dialogRef = this.dialog.open(AcountingDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {

      }
    })
  }

  /** Add new Expense */
  newSupplier() {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {

      }
    })
  }

  /** Calcula los gastos de entrada y salida */
  calculateExpenses(expenses: Expense[]) {
    expenses.map(expense => {
      if (expense.type === MovemetType.IN && expense.status == StatusType.PAID) {
        this.totalIn += Number(expense.amount)
      } else if (expense.type === MovemetType.OUT && expense.status == StatusType.PAID) {
        this.totalOut += Number(expense.amount)
      }
    })
  }

  /** Calcula los gastos pendientes */
  calculatePending(expenses: Expense[]) {
    expenses.map(expense => {
      if (expense.status == StatusType.PENDING) {
        this.totalPending += Number(expense.amount)
      }
    })
  }


}

