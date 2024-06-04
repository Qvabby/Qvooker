import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddHotelDto } from './admin/AddHotelDto';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'https://localhost:7071/Hotel';
  constructor(private http: HttpClient, private router: Router) { }


  getHotels(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      tap(response => {
        console.log("response: " + response);
        return response;
      })
    );
  }
  getHotel(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`,).pipe(
      tap(response => {
        console.log("RESPONSE OF GETTING INDIVIDUAL HOTEL: " + response);
        return response;
      })
    );
  }


  addHotel(hotel: AddHotelDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, hotel).pipe(
      map(response => {
        return response;
      })
    )
  }
}
