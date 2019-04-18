import { Component, OnInit } from '@angular/core';
import { YummlyServiceClient } from '../services/YummlyServiceClient';
import { Router } from '@angular/router';
import {UserServiceClient} from '../services/UserServiceClient';
import {SaveServiceClient} from '../services/SaveServiceClient';
import {Recipe} from '../models/recipe.model.client';
import {RecipeServiceClient} from '../services/RecipeServiceClient';
import {CollectionServiceClient} from '../services/CollectionServiceClient';

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
  recipesFromExperts: Recipe[] = [];
  collections = [];

  constructor(private router: Router, private yummlyService: YummlyServiceClient, private userService: UserServiceClient, private saveService: SaveServiceClient, private recipeService: RecipeServiceClient, private collectionService: CollectionServiceClient) { }

  ngOnInit() {
    this.userService.profile()
      .then((res) => {
        this.user = res;
        this.saveService.getAllSavedRecipesByUser(this.user.id)
          .then((recipes) => {
            this.savedRecipes = recipes;
            this.recipeService.getRecipesFromExpertsCollections(this.user.id)
              .then((recipesFromExpert) => {
                this.recipesFromExperts = recipesFromExpert;
                this.collectionService.findRecipeListByModerator(this.user.id)
                  .then((colls) => {
                    console.log('last!!!');
                    console.log(colls);
                    this.collections = colls;
                  });
              });
          });
      })
    this.userService.getAllModerators()
      .then((mods) => this.experts = mods);
  }

  search(): void {

    this.router.navigate(['/search/results/'+this.searchTerm ]);


  }

}
