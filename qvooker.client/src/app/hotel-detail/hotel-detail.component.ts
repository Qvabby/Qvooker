import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  hotel: any = [];
  hotelId: number = 0;

  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId']
      this.getHotelDetails();
      console.log(`Check Hotel instance: ${this.hotel}`)
    })
    
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

}
