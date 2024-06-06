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
  //hotelDto instance.
  hotel: AddHotelDto = {
    hotelName: '',
    stars: 0,
    hotelAdresses: [],
    rooms: [],
    HotelImages: []
  };
  //for images seperately.
  hotelImages: File[] = [];
  //know when to show address form.
  showAdressForm = false;
  addedAddress: AddAdressDto[] = [];
  //know when to show rooms form.
  showRoomForm = false;
  addedRooms: AddRoomDto[] = [];
  //constructor dependency injection.
  constructor(private hotelService: HotelService, private router: Router) { }
  //Add Hotel Method.
  AddHotel() {
    //getting files and address/rooms to dto.
    this.hotel.HotelImages = this.hotelImages;
    this.hotel.rooms = this.addedRooms;
    this.hotel.hotelAdresses = this.addedAddress;
    this.hotel.rooms = this.addedRooms;
    //creating FormData to make a request.
    let formData = new FormData();
    //configuring formData the way API wants.
    let k: keyof AddHotelDto;
    for (k in this.hotel) {
      if (k === "hotelAdresses") {
        if (this.hotel[k]) {
          let hotelAdresses = this.hotel[k]!;
          let keyHA: keyof AddAdressDto;
          for (let i = 0; i < hotelAdresses.length; i++) {
            let hotelAddress = hotelAdresses[i];
            for (keyHA in hotelAddress) {
              formData.append(`${k}[${i}].${keyHA}`, hotelAddress[keyHA]);
            }
          }
        }
      } else if (k === "rooms") {
        if (this.hotel[k]) {
          let rooms = this.hotel[k]!;
          let keyAR: keyof AddRoomDto;
          for (let i = 0; i < rooms.length; i++) {
            let room = rooms[i];
            for (keyAR in room) {
              if (keyAR === "RoomImages") {
                let RoomImages = room[keyAR];
                if (RoomImages) {
                  for (let j = 0; j < RoomImages.length; j++) {
                    formData.append(`${k}[${i}].${keyAR}`, RoomImages[j]);
                  }
                }
              } else {
                formData.append(`${k}[${i}].${keyAR}`, room[keyAR].toString());
              }
            }
          }
        }
      } else if (k === "HotelImages") {
        if (this.hotel[k]) {
          let hotelImages = this.hotel[k];
          if (hotelImages) {
            for (let i = 0; i < hotelImages.length; i++) {
              formData.append(`${k}`, hotelImages[i]);
            }
          }
        }
      } else {
        formData.append(k, this.hotel[k].toString());
      }
    }
    //check Formdata.
    console.log("FORMDATA.")
    console.log([...(formData as any)]);
    //send request.
    this.hotelService.addHotel(formData).subscribe(
      //getting response.
      response => {
        //adds
        if (response.hotelId != 0) {
          this.router.navigate([`/`]);
        }
      },
      error => {
        //if response had error.
        console.log("GETS IN ERROR OF ADDHOTEL")
        console.error('Error adding hotel:', error);
      }
    )
  }
  //what happens if Room was added (change) event.
  onRoomAdded(roomEvent: AddRoomDto) {
    const room: AddRoomDto = roomEvent as AddRoomDto;
    //console.log(room);
    if (room != undefined) {
      this.addedRooms.push(room);
    }
    this.showRoomForm = false; // Hide the room form
  }
  //what happens if Address was added (change) event.
  onAdressAdded(adressEvent: AddAdressDto) {
    const adress: AddAdressDto = adressEvent as AddAdressDto;
    //console.log(adress);
    if (adress != undefined) {
      this.addedAddress.push(adress);
    }
    this.showAdressForm = false; // Hide the adress form
  }
  //getting images.
  onHotelImagesSelected(event: any) {
    this.hotelImages = Array.from(event.target.files);
  }

}
