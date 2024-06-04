import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddHotelDto } from './admin/AddHotelDto';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'https://localhost:7071/hotel';
  constructor(private http: HttpClient, private router: Router) { }


  addHotel(hotel: AddHotelDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, hotel).pipe(
      map(response => {
        return response;
      })
    )
  }
}
