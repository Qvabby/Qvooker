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
    hotelAdresses: null,
    rooms: null
  };

  constructor(private hotelService: HotelService, private router: Router) { }

  AddHotel() {
    this.hotelService.addHotel(this.hotel).subscribe(
      response => {
        if (response.hotelId != 0) {
          this.router.navigate([`hotel/${response.hotelId}`]);
        }
      }
    )
  }


}
