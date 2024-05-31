import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRegisterDTO } from './user-register-dto.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://localhost:7071';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }


  //checking if there is token in localstorage.
  private hasToken(): boolean {
    return !!localStorage.getItem('token')
  }
  //getting token out of login post.
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.data);
          this.loggedIn.next(true);
        }
      })
    );
  }
  //also sending request when logging out.
  logout(): void {
    this.http.post<any>(`${this.apiUrl}/logout`, {}).subscribe(
      () => {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
  //registering 
  register(user: UserRegisterDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      map(response => {
        if (response.serviceSuccess) {
          this.router.navigate(['/'])
        } else if (!response.serviceSuccess) {
          alert(`$There were error registering. - ${response.errorMessage}`)
        }
      })
    )
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

}
