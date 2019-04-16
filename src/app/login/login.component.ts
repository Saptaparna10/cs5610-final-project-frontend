import { Component, OnInit } from '@angular/core';
import { UserServiceClient } from '../services/UserServiceClient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private router: Router, private userService: UserServiceClient) { }

  ngOnInit() {
  }


  login(): void {
    const user = {
      username: this.username,
      password: this.password
    }
    console.log(user);
    this.userService.logInUser(user).then((loggedInUser) => {
      if (loggedInUser === null) {
        alert('Invalid Credentials!');
      } else {
        this.router.navigate(['/profile']);
      }
    });

  }

}
