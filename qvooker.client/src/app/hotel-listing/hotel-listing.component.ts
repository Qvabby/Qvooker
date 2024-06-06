import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService} from '../hotel.service';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrl: './hotel-listing.component.css'
})
export class HotelListingComponent implements OnInit {
  //hotel instances and their stars.
  hotels: any[] = [];
  stars: number = 0;
  //constructor and dependency injection
  constructor(private hotelService: HotelService, private router: Router) { }
  //getting hotels
  ngOnInit(): void {
    this.getHotels();
  }
  //fetch
  getHotels() {
    this.hotelService.getHotels().subscribe(
      data => {
        this.stars = data.stars
        this.hotels = data;
      }
    );
  }
  //when you want to see hotel's detailed information.
  viewHotelDetails(hotelId: number) {
    this.router.navigate(['/hotel', hotelId]);
  }
}
