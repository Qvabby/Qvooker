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
  isCollapsed: boolean = false;
  isLoggedIn: Observable<boolean>;
  @Output() toggleNavbarEvent = new EventEmitter<void>();
  constructor(private authService: AccountService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  toggleNavbar() {
    this.toggleNavbarEvent.emit();
    this.isCollapsed = !this.isCollapsed;
  }
}
