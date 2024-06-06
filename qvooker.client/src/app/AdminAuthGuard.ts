import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  //constructor and dependency injection.
  constructor(private authService: AccountService, private router: Router) { }
  //Admin Auth Guard.
  canActivate(): boolean {
    const token = this.authService.getToken(); // Get the JWT token from your AuthService
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Decode and parse the JWT token
      const userRole = decodedToken.role; // Extract the user's role from the decoded token
      // Check if the user's role is 'Admin'
      if (userRole === 'Admin') {
        return true; // Allow access for Admin users
      } else {
        this.router.navigate(['/']); // Redirect to home page if user is not an Admin
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login page if no token is found
      return false;
    }
  }
}
