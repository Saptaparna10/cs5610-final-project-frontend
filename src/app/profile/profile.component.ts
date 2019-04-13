import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tabOptions: string[] = ['About', 'Liked Recipes', 'Following'];
  recipes: [{
    image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
    title: 'Chicken Tikka Masala',
    description: 'This authentic Indian dish is served with ...',
  }]
  selectedTabOption = this.tabOptions[0];
  constructor() {

    this.recipes = [{
      image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
      title: 'Chicken Tikka Masala',
      description: 'This authentic Indian dish is served with ...',
    }]

  }


  ngOnInit() {
  }

}
