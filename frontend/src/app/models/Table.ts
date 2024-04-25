import { Room } from './Room';

export interface Table {
  number: string,
  room: Room,
  is_open: boolean,
  is_active: boolean
}
