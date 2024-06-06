import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddHotelDto } from './admin/AddHotelDto';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  //API Address.
  private apiUrl = 'https://localhost:7071/Hotel';
  //Constructor and dependency injection
  constructor(private http: HttpClient, private router: Router) { }
  //Get All Hotels GET
  getHotels(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      tap(response => {
        console.log("response: " + response);
        return response;
      })
    );
  }
  //Get Specific Hotel GET
  getHotel(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`,).pipe(
      tap(response => {
        console.log("RESPONSE OF GETTING INDIVIDUAL HOTEL: " + response);
        return response;
      })
    );
  }
  //Add Hotel Post
  addHotel(hotel: FormData): Observable<any> {
    return this.http.post(this.apiUrl, hotel);
  }
}
