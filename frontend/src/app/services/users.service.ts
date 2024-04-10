import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users$ = new BehaviorSubject<User[]>([]);

  private readonly urlEndPoint: string = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  constructor() {}

  get getUsers$(): Observable<User[]> {
    return this.users$.asObservable();
  }

  setUsers$(users: User[]): void {
    this.users$.next(users);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlEndPoint}/`);
  }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.urlEndPoint}/`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.urlEndPoint}/${user.id}/`, user);
  }
}
