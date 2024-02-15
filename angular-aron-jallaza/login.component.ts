import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  invalidLogin: boolean = false;

  constructor(private authService: AuthenticationService) { }

  login() {
    this.invalidLogin = !this.authService.authenticate(this.username, this.password);
  }
}
