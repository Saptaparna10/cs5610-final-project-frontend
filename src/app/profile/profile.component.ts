import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';
import {ActivatedRoute} from '@angular/router';
import {FollowServiceClient} from '../services/FollowServiceClient';
import { RecipeCollection } from '../models/recipe-collection.model.client';

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
  loggedInUserId;
  enableEdit: Boolean;
  followers = [];
  following = [];
  isFollowing;

  //Collection attributes:
  newCollection : RecipeCollection;
  //newCollImgSrc: String = "";

  tabOptions: string[] = ['Personal', 'Saved Recipes', 'Recipe lists', 'Following', 'Followers'];
  recipes: [{
    image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
    title: 'Chicken Tikka Masala',
    description: 'This authentic Indian dish is served with ...',
  }]
  selectedTabOption = this.tabOptions[0];

  constructor(private route: ActivatedRoute, private userService: UserServiceClient, private followService: FollowServiceClient) {
    this.route.params.subscribe(
      params => {
        this.userId = params.userId;
        this.loadProfile();
      });


    this.recipes = [{
      image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
      title: 'Chicken Tikka Masala',
      description: 'This authentic Indian dish is served with ...',
    }]

  }

  loadProfile() {
    this.userService.profile().then((res) => {
      this.loggedInUserId = res.id;
      if (this.loggedInUserId == this.userId) {
        this.userId = null;
      }
      if (this.userId == null) {
        console.log('HERE!!')
        this.userService.profile().then((loggedInUser) => {
          this.firstName = loggedInUser.firstName;
          this.lastName = loggedInUser.lastName;
          this.username = loggedInUser.username;
          this.password = loggedInUser.password;
          this.confirmPassword = loggedInUser.password;
          this.role = loggedInUser.type;
          this.phoneNum = loggedInUser.phoneNumber;
          this.enableEdit = true;

        }).then(() => {
          if (this.role === 'MODERATOR') {
            console.log('I am mod..user id ' + this.loggedInUserId);
            this.followService.getFollowers(this.loggedInUserId)
              .then((res) => this.followers = res);
          } else {
            console.log('I am user..user id '+ this.loggedInUserId);
            this.followService.getFollowing(this.loggedInUserId)
              .then((res) => this.following = res);
          }
        });
      } else {
        this.userService.getUserById(this.userId).then((usr) => {
          console.log('RESPONSE '+ usr.type);
          this.firstName = usr.firstName;
          this.lastName = usr.lastName;
          this.username = usr.username;
          this.password = usr.password;
          this.confirmPassword = usr.password;
          this.role = usr.type;
          this.phoneNum = usr.phoneNumber;
          this.enableEdit = false;

        })
          .then(() => {
            if (this.role === 'MODERATOR') {
              this.selectedTabOption = this.tabOptions[2];
              console.log('I am mod..user id ' + this.userId);
              this.followService.getIfUserFollowingMod(this.loggedInUserId, this.userId)
                .then((res) => {
                  console.log('button!!!!!!! ' + res);
                  this.isFollowing = res;
                });
              this.followService.getFollowers(this.userId)
                .then((res) => {
                  console.log('followers ' + res.length);
                  this.followers = res;
                });
            } else {
              this.selectedTabOption = this.tabOptions[1];
              console.log('I am user..user id ' + this.userId);
              this.followService.getFollowing(this.userId)
                .then((res) => {
                  console.log('following ' + res.length);
                  this.following = res;
                });
            }
          });
      }

    });
  }


  ngOnInit() {

    this.newCollection = {
      id: 0,
      name: "",
      imageURL : "https://images.unsplash.com/photo-1553639766-450abeeaf06d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60",
      recipes : []

    }
  
    console.log(this.newCollection);
   // this.newCollImgSrc = "https://images.unsplash.com/photo-1553639766-450abeeaf06d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60";

  }

  follow(): void {

    if (this.loggedInUserId === this.userId) {
      return;
    }

    this.followService.follow(this.loggedInUserId, this.userId)
      .then((res) => {
          this.isFollowing = true;
          this.followers.push(res);
      });

  }

  unfollow(): void {

    if (this.loggedInUserId === this.userId) {
      return;
    }
    this.followService.unfollow(this.loggedInUserId, this.userId)
      .then((res) => {
        this.followService.getFollowers(this.userId)
          .then((c) => {
            this.isFollowing = false;
            this.followers = c;
          });
      });

  }


  createCollection(){
console.log("inside create coleectionnn");
console.log(this.newCollection);
  }

  confirmDeleteCollection(collec) {
    var affirm = confirm("Are you sure you want to delete this collection?");
    if (affirm) {
      //delete collection
    }
  }


}
