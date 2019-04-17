import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})
export class RecipeCollectionComponent implements OnInit {

  recipes: [{
    image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
    title: 'Chicken Tikka Masala',
    description: 'This authentic Indian dish is served with ...',
  }]
  constructor() {
    this.recipes = [{
      image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
      title: 'Chicken Tikka Masala',
      description: 'This authentic Indian dish is served with ...',
    }]
   }

  ngOnInit() {
  }

  confirmDeleteRecipe(recipe) {
    var affirm = confirm("Are you sure you want to remove this recipe?");
    if (affirm) {
      //delete collection
    }
  }

}
