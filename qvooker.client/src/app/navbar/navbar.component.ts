import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';

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
  constructor(private authService: AccountService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  toggleNavbar() {
    this.toggleNavbarEvent.emit();
    this.isCollapsed = !this.isCollapsed;
  }
}
