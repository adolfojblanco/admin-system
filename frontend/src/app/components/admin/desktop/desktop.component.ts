import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ShoppingList, TaskList } from '../../../models/Task';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styles: `
    .list-group-item {
      border: none !important;
    }
    .table > tbody {
      vertical-align: middle !important;
    }
    .table td th tr {
      text-align: center;
      vertical-align: middle;
    }
  `
})

export class DesktopComponent implements OnInit {
  private toast = inject(HotToastService);
  private dialog = inject(MatDialog);
  public taskService = inject(TaskService)
  public shoppingList: ShoppingList[] = [];
  public taskList: TaskList[] = [];

  ngOnInit(): void {
    this.loadShoppingList();
    this.loadTaskList();
  }


  loadShoppingList() {
    this.taskService.getShoppingList().subscribe((res) => this.shoppingList = res)
  }

  loadTaskList() {
    this.taskService.getTaskList().subscribe((res) => this.taskList = res)
  }

  completeShoppingItem(item: ShoppingList) {
    item.is_complete = true
    this.taskService.completeShoppingListItem(item).subscribe((res) => {
      this.toast.success('Item Completado');
      this.loadShoppingList()
    })
  }

  newShoppingItem() {
    const dialogRef = this.dialog.open(ShoppingItemComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadShoppingList()
      }
    });
  }

  newTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadShoppingList()
      }
    });
  }


}
