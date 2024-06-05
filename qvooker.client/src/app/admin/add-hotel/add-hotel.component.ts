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
    rooms: [],
    hotelImages: []
  };

  hotelImages: File[] = [];
  roomImagesMap: Map<number, File[]> = new Map<number, File[]>() //Map to store room images by id.


  showAdressForm = false;
  addedAddress: AddAdressDto[] = [];

  showRoomForm = false;
  addedRooms: AddRoomDto[] = [];

  constructor(private hotelService: HotelService, private router: Router) { }

  AddHotel() {
    this.hotel.rooms = this.addedRooms;
    this.hotel.hotelAdresses = this.addedAddress;
    this.hotel.hotelImages = this.hotelImages;



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

  onRoomAdded(roomEvent: AddRoomDto) {
    const room: AddRoomDto = roomEvent as AddRoomDto;
    console.log(room);
    if (room != undefined) {
      this.addedRooms.push(room);
    }
    this.showRoomForm = false; // Hide the room form
  }

  onAdressAdded(adressEvent: AddAdressDto) {
    
    const adress: AddAdressDto = adressEvent as AddAdressDto;
    console.log(adress);
    if (adress != undefined) {
      this.addedAddress.push(adress);
    }
    this.showAdressForm = false; // Hide the adress form
  }

  onHotelImagesSelected(event: any) {
    this.hotelImages = Array.from(event.target.files);
  }

}
