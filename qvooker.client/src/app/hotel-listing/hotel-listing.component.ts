import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService} from '../hotel.service';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrl: './hotel-listing.component.css'
})
export class HotelListingComponent implements OnInit {
  hotels: any[] = [];
  stars: number = 0;

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    this.hotelService.getHotels().subscribe(
      data => {
        this.stars = data.stars
        this.hotels = data;
      }
    );
  }

  viewHotelDetails(hotelId: number) {
    this.router.navigate(['/hotel', hotelId]);
  }
}
