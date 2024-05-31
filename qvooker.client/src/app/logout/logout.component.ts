import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private accountService: AccountService, private router: Router) { this.logout() }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login'])
  }


}
