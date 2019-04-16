import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName: String;
  lastName: String;
  username: String;
  password: String;
  confirmPassword: String;
  phoneNum: Number;
  role: String;
  userId;
  enableEdit: Boolean;

  tabOptions: string[] = ['About', 'Liked Recipes', 'Following', 'Followers'];
  recipes: [{
    image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
    title: 'Chicken Tikka Masala',
    description: 'This authentic Indian dish is served with ...',
  }]
  selectedTabOption = this.tabOptions[0];

  constructor(private route: ActivatedRoute, private userService: UserServiceClient) {
    this.route.params.subscribe(
      params => this.userId = params.userId);

    this.recipes = [{
      image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
      title: 'Chicken Tikka Masala',
      description: 'This authentic Indian dish is served with ...',
    }]

  }


  ngOnInit() {
    if(this.userId == null) {
      console.log('HERE!!')
      this.userService.profile().then((loggedInUser) => {
        this.firstName = loggedInUser.firstName;
        this.lastName = loggedInUser.lastName;
        this.username = loggedInUser.username;
        this.password = loggedInUser.password;
        this.confirmPassword = loggedInUser.password;
        this.role = loggedInUser.type;
        this.phoneNum = loggedInUser.phoneNumber;
        this.enableEdit= true;
      });
    }
    else{
      this.userService.getUserById(this.userId).then((usr) => {
        this.firstName = usr.firstName;
        this.lastName = usr.lastName;
        this.username = usr.username;
        this.password = usr.password;
        this.confirmPassword = usr.password;
        this.role = usr.type;
        this.phoneNum = usr.phoneNumber;
        this.enableEdit= false;
      });
    }

  }

}
