import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";



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
  public forecasts: WeatherForecast[] = [];
  public hotels: Hotel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    this.getHotels();
  }


  //getHotels() {
  //  var url = 'localhost:7071/Hotel'
  //  this.http.get<Hotel[]>(url).subscribe(
  //    (result) => {
  //      console.log(result);
  //      this.hotels = result;
  //    },(error) => {
  //      console.error(error);
  //    }
  //  );
  //}

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

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'qvooker.client';
}
