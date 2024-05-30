import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRegisterDTO } from './user-register-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://localhost:7071/';

  constructor(private http: HttpClient) { }

  register(user: UserRegisterDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, user).pipe(
      map(response => {
        return response;
      })
    )
  }

}
