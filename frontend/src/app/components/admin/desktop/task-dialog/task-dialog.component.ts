import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingList } from '../../../../models/Task';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styles: ``
})
export class TaskDialogComponent {
  public fb = inject(FormBuilder);
  public toast = inject(HotToastService);
  public taskService = inject(TaskService)
  public titulo: string = 'Nueva Tarea'


  constructor(@Inject(MAT_DIALOG_DATA) public data: ShoppingList) {
    if (data) {
      this.taskListForm.reset(data);
    }
  }

  public taskListForm: FormGroup = this.fb.group({
    id: [],
    title: ['', [Validators.required, Validators.minLength(3)]],
  })

  newTask() {
    this.taskService.newTask(this.taskListForm.value).subscribe((res) => {
      this.toast.success('Tarea resgitrada');
    })
  }

  isValid(name: string) { }





}
