import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  isNavbarExpanded: boolean = false;
  constructor(private http: HttpClient, private authService: AccountService) { }
  //toggling navbar.
  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded; // Toggle between true and false
  }
  title = 'qvooker.client';
}
