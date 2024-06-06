import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Data Transfer Object.
export interface BookRoomDTO {
  userId: string;
  hotelId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  //API Adress.
  private apiUrl = 'https://localhost:7071/Booking/BookRoom';
  //constructor and dependency injection.
  constructor(private http: HttpClient) { }
  //book room post.
  bookRoom(booking: BookRoomDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, booking);
  }
}
