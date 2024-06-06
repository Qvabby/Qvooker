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
    HotelImages: []
  };
  hotelImages: File[] = [];


  showAdressForm = false;
  addedAddress: AddAdressDto[] = [];

  showRoomForm = false;
  addedRooms: AddRoomDto[] = [];

  constructor(private hotelService: HotelService, private router: Router) { }

  AddHotel() {
    
    this.hotel.HotelImages = this.hotelImages;
    this.hotel.rooms = this.addedRooms;
    this.hotel.hotelAdresses = this.addedAddress;
    
    this.hotel.rooms = this.addedRooms;



    let formData = new FormData();

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

    console.log("FORMDATA.")
    console.log([...(formData as any)]);

    //const formDataObject: Record<string, string> = {};

    //formData.forEach((value, key) => {
    //  formDataObject[key] = value.toString(); // Convert to string if needed
    //});

    //const formDataJSON = JSON.stringify(formDataObject, null, 2);
    //console.log('FormData:', formDataJSON);

    //console.log(JSON.stringify(this.hotel))

    this.hotelService.addHotel(formData).subscribe(

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
