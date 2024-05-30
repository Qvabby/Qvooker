import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { UserRegisterDTO } from '../user-register-dto.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user: UserRegisterDTO = {
    name: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmedPassword: ''
  };

  constructor(private accountService: AccountService, private router: Router) { }

  register() {
    this.accountService.register(this.user).subscribe(
      response => {
        if (response.success) {
          //navigate to successful part of registration.
        } else {
          //handling registration failure
          alert(response.message);
        }
      },
      error => {
        //handling HTTP error
        alert('registration failed.');
      }
    )
  }
}
