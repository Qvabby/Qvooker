import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { BookRoomDTO, BookingService } from '../booking.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  hotel: any = [];
  hotelId: number = 0;
  selectedRoom: any = null;
  startDate: string = '';
  endDate: string = '';
  totalCost: number | null = null;
  userId: string = '';  
  constructor(private route: ActivatedRoute, private hotelService: HotelService, private bookingService: BookingService, private accountService:AccountService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId']
      this.getHotelDetails();
      this.getUserInfo(); // Fetch user info when component initializes
      console.log(`Check Hotel instance: ${this.hotel}`)
    })
    
  }
  getUserInfo() {
    this.accountService.getUserInfo().subscribe(
      data => {
        this.userId = data.userId; // Extract userId from the response
        console.log(`User ID:`, this.userId);
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
  }


  getHotelDetails() {
    this.hotelService.getHotel(this.hotelId).subscribe(
      data => {
        this.hotel = data;
        console.log(`Hotel details:`, this.hotel);
        return data;
        
      },
      error => {
        console.error('Error fetching hotel details:', error);
      }
    )
  }

  bookRoom(roomId: number) {
    //functionality of booking the room.
  }


  selectRoom(room: any) {
    this.selectedRoom = room;
    this.startDate = '';
    this.endDate = '';
    this.totalCost = null;
  }

  calculateTotalCost() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalCost = diffDays * this.selectedRoom.price;
    }
  }

  confirmBooking() {
    if (this.startDate && this.endDate) {
      const booking: BookRoomDTO = {
        userId: this.userId,
        hotelId: this.hotelId,
        roomId: this.selectedRoom.roomId,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      };

      this.bookingService.bookRoom(booking).subscribe(
        response => {
          console.log('Room booked successfully:', response);
          // Add any success handling logic here, such as showing a confirmation message or redirecting the user
        },
        error => {
          console.error('Error booking room:', error);
        }
      );
    }
  }

  cancelBooking() {
    this.selectedRoom = null;
    this.startDate = '';
    this.endDate = '';
    this.totalCost = null;
  }



}
