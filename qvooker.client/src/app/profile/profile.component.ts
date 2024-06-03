import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


interface UserInfo {
  userId: string;
  name?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  bookedRooms: Room[];
}

interface HotelAddress {
  country: string;
  city: string;
  street: string;
}

interface Room {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  price: number;
  hotelAddresses: HotelAddress[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfo | null = null;
  
  
  constructor(private _accountService: AccountService, private _router:Router) { }
    ngOnInit(): void {
      this.getInfo()
    }


  getInfo() {
    this._accountService.getUserInfo().subscribe(
      data => {
        this.userInfo = {
          userId: data.userId,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          username: data.userName,
          bookedRooms: data.bookedRooms.map((room: any) => ({
            id: room.id,
            hotelId: room.hotelId,
            name: room.name,
            description: room.description,
            price: room.price,
            hotelAddresses: room.hotelAdresses.map((address: any) => ({
              country: address.country,
              city: address.city,
              street: address.street
            }))
          }))
        };
        console.log("userinfo: ", this.userInfo);
      }
    );
  }
}
