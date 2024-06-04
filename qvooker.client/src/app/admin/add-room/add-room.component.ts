import { Component, EventEmitter, Output } from '@angular/core';
import { AddRoomDto } from '../AddRoomDto';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  @Output() roomAdded = new EventEmitter<AddRoomDto>();
  room: AddRoomDto = {
    name: '',
    description: '',
    price: 0
  };
  constructor() { }

  addRoom() {
    this.roomAdded.emit(this.room); // Emit the room data to the parent component
    this.resetForm();
  }

  resetForm() {
    this.room = {
      name: '',
      description: '',
      price: 0
    };
  }
}
