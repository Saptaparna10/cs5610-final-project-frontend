import { Component, OnInit } from '@angular/core';
import { YummlyServiceClient } from '../services/YummlyServiceClient';
import { Router } from '@angular/router';
import {UserServiceClient} from '../services/UserServiceClient';
import {SaveServiceClient} from '../services/SaveServiceClient';
import {Recipe} from '../models/recipe.model.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm: String;
  experts = [];
  user;
  savedRecipes: Recipe[] = [];

  constructor(private router: Router, private yummlyService: YummlyServiceClient, private userService: UserServiceClient, private saveService: SaveServiceClient) { }

  ngOnInit() {
    this.userService.profile()
      .then((res) => {
        this.user = res;
        this.saveService.getAllSavedRecipesByUser(this.user.id)
          .then((recipes) => {
            this.savedRecipes = recipes;
            console.log(recipes);
          });
      })
    this.userService.getAllModerators()
      .then((mods) => this.experts = mods);
  }

  search(): void {

    this.router.navigate(['/search/results/'+this.searchTerm ]);


  }

}
