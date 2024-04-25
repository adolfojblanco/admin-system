import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Table } from '../models/Table';
import { Room } from '../models/Room';


@Injectable({
  providedIn: 'root'
})


export class PosService {
  private readonly urlEndPoint: string = `${environment.apiUrl}/pos`;
  private http = inject(HttpClient);

  constructor() { }


  getTables(): Observable<Table> {
    return this.http.get<Table>(`${this.urlEndPoint}/tables/`);
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.urlEndPoint}/rooms/`);
  }

}
