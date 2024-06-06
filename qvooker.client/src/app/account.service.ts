import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserRegisterDTO } from './user-register-dto.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://localhost:7071';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private tokenKey = 'token';
  constructor(private http: HttpClient, private router: Router) { this.loggedIn = new BehaviorSubject<boolean>(this.hasToken())}


  //checking if there is token in localstorage.
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey)
  }
  //getting token.
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //check if user is logged in.
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  //getting token out of login HTTP POST (log in.).
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.serviceSuccess) {
          localStorage.setItem('token', response.data);
          this.loggedIn.next(true);
          console.log(`logged In. isLoggedIn: ${this.isLoggedIn()}`)
        }
      })
    );
  }
  //also sending request when logging out.
  logout(): void {
    this.http.post<any>(`${this.apiUrl}/logout`, {}).pipe(

    ).subscribe(
      () => {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
        console.log(`logged out. isLoggedIn: ${this.isLoggedIn()}`)
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
  //sending register HTTP POST
  //register(user: UserRegisterDTO): Observable<any> {
  //  return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
  //    map(response => {
  //      if (response.serviceSuccess) {
  //        this.router.navigate(['/'])
  //      } else if (!response.serviceSuccess) {
  //        alert(`$There were error registering. - ${response.errorMessage}`)
  //      }
  //    })
  //  )
  //}
  register(user: UserRegisterDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      map(response => {
        if (response.serviceSuccess) {
          this.router.navigate(['/']);
        } else {
          alert(`There was an error registering. - ${response.errorMessage}`);
        }
        return response;
      })
    );
  }

  
  //get information out of Jwt token.
  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Account/info`).pipe(
      tap(response => {
        console.log("response: "+ response)
        return response;
      })
    )
  }


}
