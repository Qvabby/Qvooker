import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //form
  credentials = { username: '', password: '', rememberMe: false };
  //constructor and dependency injection.
  constructor(private _accountService: AccountService, private router: Router) { }
  //login Method.
  login() {
    //calling service method.
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
