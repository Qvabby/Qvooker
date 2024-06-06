import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private apiUrl = 'https://localhost:7071/Booking/BookRoom';

  constructor(private http: HttpClient) { }

  bookRoom(booking: BookRoomDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, booking);
  }
}
