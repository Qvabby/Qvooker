import { Component, EventEmitter, Output } from '@angular/core';
import { AddRoomDto } from '../AddRoomDto';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  //to connect add room component ts to add hotel component ts.
  @Output() roomAdded = new EventEmitter<AddRoomDto>();
  //creating addroomDTO instance.
  room: AddRoomDto = {
    name: '',
    description: '',
    price: 0,
    RoomImages: []
  };
  //for images seperately.
  RoomImages: File[] = [];
  //constructor.
  constructor() { }
  //add Room method
  addRoom() {
    this.room.RoomImages = this.RoomImages;
    this.roomAdded.emit(this.room); // Emit the room data to the parent component
    this.resetForm();
  }
  //resetting Form of add room
  resetForm() {
    this.room = {
      name: '',
      description: '',
      price: 0,
      RoomImages: []
    };
  }
  //in case we want to cancel adding.
  cancel() {
    this.roomAdded.emit();
  }
  //getting Room Images.
  onRoomImagesSelected(event: any) {
    this.RoomImages = Array.from(event.target.files);
  }

}
