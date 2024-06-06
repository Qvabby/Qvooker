import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  //constructor and dependency injection
  constructor(private accountService: AccountService, private router: Router) { this.logout() }
  //logging out.
  logout() {
    this.accountService.logout();
    this.router.navigate(['/login'])
  }
}
