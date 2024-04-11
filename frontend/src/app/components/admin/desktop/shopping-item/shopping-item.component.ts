import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingList } from '../../../../models/Task';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styles: ``
})
export class ShoppingItemComponent {
  public fb = inject(FormBuilder);
  public taskService = inject(TaskService)
  public titulo: string = 'Nuevo Item'
  public textButton: string = 'Nuevo Item'

  constructor(@Inject(MAT_DIALOG_DATA) public data: ShoppingList) {
    if (data) {
      this.shoppingListForm.reset(data);
    }
  }
  
  public shoppingListForm: FormGroup = this.fb.group({
    id: [],
    title: ['', [Validators.required, Validators.minLength(3)]],
    priority: ['', [Validators.required]],
  })

  newItemShoppingList() {
    this.taskService.newShoppingListItem(this.shoppingListForm.value).subscribe((res) => {

    })
  }

  isValid(name: string) { }
}
