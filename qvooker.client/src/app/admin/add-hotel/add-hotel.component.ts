import { Component } from '@angular/core';
import { AddAdressDto } from "../AddAdressDto";
import { AddRoomDto } from "../AddRoomDto";
import { AddHotelDto } from '../AddHotelDto';
import { HotelService } from '../../hotel.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.hotel.rooms = this.addedRooms;

    //let formData = new FormData();
    //formData.append('hotelName', this.hotel.hotelName);
    //formData.append('stars', this.hotel.stars.toString());

    //if (this.hotelImages) {
    //  for (var i = 0; i < length; i++) {
    //    formData.append(`hotelImages${i}`, this.hotelImages[i]);
    //  }
    //}

    //for (let k in this.addedRooms) {
    //  formData.append(`room.${k}`, this.addedRooms[k]);
    //}

    

    //const formData = new FormData();
    //formData.append('hotelName', this.hotel.hotelName);
    //formData.append('stars', this.hotel.stars.toString());

    //// Append hotel images
    //this.hotel.hotelImages.forEach((image, index) => {
    //  formData.append(`hotelImages[${index}]`, image);
    //});

    //// Append addresses
    //this.hotel.hotelAdresses.forEach((address, index) => {
    //  formData.append(`hotelAdresses[${index}].street`, address.street);
    //  formData.append(`hotelAdresses[${index}].city`, address.city);
    //  formData.append(`hotelAdresses[${index}].country`, address.country);
    //});

    //// Append rooms
    //this.hotel.rooms.forEach((room, index) => {
    //  formData.append(`rooms[${index}].name`, room.name);
    //  formData.append(`rooms[${index}].description`, room.description);
    //  formData.append(`rooms[${index}].price`, room.price.toString());
    //  if (room.roomImages) {
    //    room.roomImages.forEach((image, imgIndex) => {
    //      formData.append(`rooms[${index}].roomImages[${imgIndex}]`, image);
    //    });
    //  }

    //});


    //const formDataObject: Record<string, string> = {};

    //formData.forEach((value, key) => {
    //  formDataObject[key] = value.toString(); // Convert to string if needed
    //});

    //const formDataJSON = JSON.stringify(formDataObject, null, 2);
    //console.log('FormData:', formDataJSON);

    console.log(JSON.stringify(this.hotel))

    this.hotelService.addHotel(this.hotel).subscribe(

      response => {
        console.log("GETS IN ADDHOTEL SUCCESS CLIENT")
        if (response.hotelId != 0) {
          this.router.navigate([`/`]);
        }
      },
      error => {
        console.log("GETS IN ERROR OF ADDHOTEL")
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
