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
  //form
  user: UserRegisterDTO = {
    name: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmedPassword: ''
  };
  //constructor and dependency injection
  constructor(private accountService: AccountService, private router: Router) { }
  //register
  register() {
    //calling service method.
    this.accountService.register(this.user).subscribe(
      response => {
        if (response.serviceSuccess) {
          this.router.navigate(['/welcome']);
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
