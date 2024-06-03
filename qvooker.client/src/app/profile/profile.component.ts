import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


interface UserInfo {
  name?: string;
  email?: string;
  username?: string;
}
interface userRoomBookings {

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfo | null = null;
  
  
  constructor(private _accountService: AccountService, private _router:Router) { }
    ngOnInit(): void {
      this.getInfo()
    }


  getInfo() {
    this._accountService.getUserInfo().subscribe(
      data => {
        this.userInfo = {
          name: data.name,
          email: data.email,
          username: data.userName
        };
        console.log(this.userInfo)
      }
    )
  }
}
