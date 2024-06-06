import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: 'auto',
        visibility: 'visible'
      })),
      state('expanded', style({
        height: '*',
        visibility: 'visible'
      })),

    ])
  ]
})
export class NavbarComponent {
  //if navbar is collapsed or no.
  isCollapsed: boolean = false;
  //if user is logged in or no.
  isLoggedIn: Observable<boolean>;
  //to toggle.
  @Output() toggleNavbarEvent = new EventEmitter<void>();
  //constructor and dependency injection
  constructor(private authService: AccountService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  //logging out.
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  //toggling the navbar.
  toggleNavbar() {
    this.toggleNavbarEvent.emit();
    this.isCollapsed = !this.isCollapsed;
  }
}
