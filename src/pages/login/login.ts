import { Component } from '@angular/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {username: string, email: string, password: string} = {
    username: '',
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor() {
  }

  // Attempt to login in through our User service
  doLogin() {
  }
}
