import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AccountService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => console.log('IsLoggedIn:', isLoggedIn)), // Log the value of isLoggedIn
      take(1),
      map((isLoggedIn: boolean) => {
        if (state.url === '/login' || state.url === '/register') {
          if (isLoggedIn) {
            // If user is already logged in and tries to access login/register pages, redirect to profile
            this.router.navigate(['/profile']);
            return false;
          } else {
            // Allow access to login/register pages for unauthenticated users
            return true;
          }
        } else {
          // For other routes, only allow access if user is logged in
          if (isLoggedIn) {
            return true;
          } else {
            // If user is not logged in and tries to access other pages, redirect to login page
            this.router.navigate(['/login']);
            return false;
          }
        }
      })
    );
  }

}
