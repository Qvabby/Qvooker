import { Component } from '@angular/core';
import { AddAdressDto } from "../AddAdressDto";
import { AddRoomDto } from "../AddRoomDto";
import { AddHotelDto } from '../AddHotelDto';
import { HotelService } from '../../hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {
  hotel: AddHotelDto = {
    hotelName: '',
    stars: 0,
    hotelAdresses: [],
    rooms: []
  };

  newAddress: AddAdressDto = {
    country: '',
    city: '',
    street: ''
  };

  showRoomForm = false;
  addedRooms: AddRoomDto[] = [];

  constructor(private hotelService: HotelService, private router: Router) { }

  AddHotel() {
    this.hotel.rooms = this.addedRooms;
    this.hotelService.addHotel(this.hotel).subscribe(
      response => {
        if (response.hotelId != 0) {
          this.router.navigate([`/`]);
        }
      },
      error => {
        console.error('Error adding hotel:', error);
      }
    )
  }

  addAddress() {
    if (this.hotel.hotelAdresses) {
      this.hotel.hotelAdresses.push(this.newAddress);
      console.log(this.hotel.hotelAdresses);
      this.resetAdressForm();
    }
  }

  resetAdressForm() {
    this.newAddress = {
      country: '',
      city: '',
      street: ''
    };
  }

  onRoomAdded(roomEvent: AddRoomDto) {
    const room: AddRoomDto = roomEvent as AddRoomDto;
    this.addedRooms.push(room);
    this.showRoomForm = false; // Hide the room form
  }

}
