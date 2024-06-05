import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { AccountService } from './account.service';



interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
interface Hotel {
  hotelName: string;
  stars: number;
  hotelAdresses: Adress[];
  rooms: Room[]
}

interface Room {
  Name: string;
  Description: string;
  price: number;
}
interface Adress {
  Country: string;
  City: string;
  Street: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public hotels: Hotel[] = [];
  isLoggedIn: Observable<boolean>;
  isNavbarExpanded: boolean = false;
  constructor(private http: HttpClient, private authService: AccountService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  

  

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded; // Toggle between true and false
  }

  ngOnInit() {
    this.getHotels();
  }


  getHotels() {
    this.http.get<Hotel[]>('https://localhost:7071/Hotel').subscribe(
      (result) => {
        this.hotels = result;
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'qvooker.client';
}
