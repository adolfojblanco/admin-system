import { Component, inject, OnInit } from '@angular/core';
import { PosService } from '../../../../services/pos.service';
import { Room } from '../../../../models/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styles: ``
})
export class RoomsComponent implements OnInit {
  private posService = inject(PosService)
  public rooms: Room[] = [];


  ngOnInit(): void {
    this.loadRooms();
  }

  /** load rooms */
  loadRooms(): void {
    this.posService.getRooms().subscribe((res) => this.rooms = res);
  }

  /** open room */
  openRoom(room: Room) {
    console.log(room)
  }
}
