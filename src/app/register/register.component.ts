import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/UserServiceClient";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: String;
  email: String;
  password: String;
  confirmPassword: String;
  firstName: String;
  lastName: String;
  phoneNumber: Number;
  image: String;
  role: String;

  constructor(private router: Router, private userService: UserServiceClient) { }

  ngOnInit() {

  }

  register(): void {
    console.log(this.username, this.password, this.firstName, this.role);
    if (this.username === undefined || this.email === undefined
      || this.password === undefined || this.firstName === undefined || this.role === undefined) {
      alert('Please fill out the mandatory fields!');
    } else if (this.confirmPassword !== this.password) {
      alert('Passwords do not match!');
    } else {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        imgurl: this.image,
        type: this.role
      }
      console.log(user);
      if (user.type === 'MODERATOR') {
        this.userService.registerModerator(user).catch(
          error => {
            console.log(error);
            alert('Something went wrong! Please try again!');
          }
        ).then((loggedInUser) => {
          console.log(loggedInUser);
          if (loggedInUser === null) {
            alert('Username already exists!');
          }
        });
      }
      else{
        this.userService.registerUser(user).catch(
          error => {
            console.log(error);
            alert('Something went wrong, please try again!')
          }
        ).then((loggedInUser) => {
          console.log(loggedInUser);
          if (loggedInUser === null) {
            alert('Username already exists!');
          }

        });
      }
    }

  }

}
