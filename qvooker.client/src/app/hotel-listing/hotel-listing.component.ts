import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface Address {
  country: string;
  city: string;
  street: string;
}

export interface Room {
  name: string;
  description: string;
  price: number;
}

export interface Hotel {
  hotelId: number;
  hotelName: string;
  stars: number;
  hotelAdresses: Address[];
  rooms: Room[];
}

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrl: './hotel-listing.component.css'
})
export class HotelListingComponent implements OnInit {
  //hotel instances and their stars.
  hotels: Hotel[] = [];
  stars: number = 0;
  //filtering
  filteredHotels: Hotel[] = [];
  searchForm: FormGroup;
  //constructor and dependency injection
  constructor(private hotelService: HotelService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      hotelName: [''],
      country: [''],
      city: [''],
      stars: [0, [Validators.min(0)]], // Minimum value of 0
      rooms: [0, [Validators.min(0)]], // Minimum value of 0
    });
    this.getHotels();
    this.filteredHotels = this.hotels; // Initially show all hotels
  }
  //getting hotels
  ngOnInit(): void {
    this.getHotels();
    this.filteredHotels = this.hotels; // Initially show all hotels
    console.log("fetch: "+ this.filteredHotels)
    this.searchForm.valueChanges.subscribe(() => {
      this.filterHotels();
    });
  }
  //fetch
  getHotels() {
    this.hotelService.getHotels().subscribe(
      data => {
        console.log("GetHotels GET: " + data)
        this.hotels = data;
        this.filteredHotels = this.hotels;
        console.log("if its mapped right: "+ this.hotels)
      }
    );
  }
  //filtering
  filterHotels() {
    const { hotelName, country, city, stars, rooms } = this.searchForm.value;

    this.filteredHotels = this.hotels.filter(hotel => {
      const matchesHotelName = hotelName ? hotel.hotelName.toLowerCase().includes(hotelName.toLowerCase()) : true;
      const matchesCountry = country ? hotel.hotelAdresses.some(address => address.country.toLowerCase().includes(country.toLowerCase())) : true;
      const matchesCity = city ? hotel.hotelAdresses.some(address => address.city.toLowerCase().includes(city.toLowerCase())) : true;
      const matchesStars = stars ? hotel.stars === +stars : true;
      const matchesRooms = rooms ? hotel.rooms.length === +rooms : true;

      return matchesHotelName && matchesCountry && matchesCity && matchesStars && matchesRooms;
    });
  }
  //when you want to see hotel's detailed information.
  viewHotelDetails(hotelId: number) {
    this.router.navigate(['/hotel', hotelId]);
  }
}
