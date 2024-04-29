import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingList, TaskList } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly urlEndPoint: string = `${environment.apiUrl}/task`;
  private http = inject(HttpClient);


  getShoppingList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlEndPoint}/shopping-list/`)
  }

  newShoppingListItem(item: ShoppingList): Observable<ShoppingList[]> {
    return this.http.post<ShoppingList[]>(`${this.urlEndPoint}/shopping-list/`, item)
  }

  completeShoppingListItem(item: ShoppingList): Observable<ShoppingList> {
    return this.http.put<ShoppingList>(`${this.urlEndPoint}/shopping-list/${item.id}/`, item)
  }

  /** Get all task list */
  getTaskList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlEndPoint}/tasks-list/`)
  }

  /** Create a task */
  newTask(item: TaskList): Observable<TaskList> {
    console.log(item)
    return this.http.post<TaskList>(`${this.urlEndPoint}/tasks-list/`, item)
  }

  /** Complete task */
  completeTask(item: ShoppingList): Observable<ShoppingList> {
    return this.http.put<ShoppingList>(`${this.urlEndPoint}/shopping-list/${item.id}/`, item)
  }
}



