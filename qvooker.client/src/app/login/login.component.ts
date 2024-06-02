import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '', rememberMe: false };

  constructor(private _accountService: AccountService, private router: Router) { }


  login() {
    this._accountService.login(this.credentials).subscribe(
      response => {
        if (response.serviceSuccess) {
          this.router.navigate(['/profile']);
        }
      },
      error => {
        alert('login failed.')
      }
    )
  }


}
