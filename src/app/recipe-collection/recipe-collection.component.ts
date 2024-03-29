import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionServiceClient} from '../services/CollectionServiceClient';
import {UserServiceClient} from '../services/UserServiceClient';
import {Recipe} from '../models/recipe.model.client';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})
export class RecipeCollectionComponent implements OnInit {

  collectionId;
  mod;
  collection;
  recipes: Recipe[] = [];
  enableRemove: Boolean;
  loggedInUser;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private collectionService: CollectionServiceClient,
              private userService: UserServiceClient) {
    this.mod = {
      id: String,
      username: String,
      name: String
    };
    this.collection = {
      name: String
    };

    this.userService.profile()
      .then((loggededInUser) => {
        if (loggededInUser == null) {
          this.router.navigate(['/login']);
        }
        this.loggedInUser = loggededInUser;
      });

  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.collectionId = params.collectionId;
        this.collectionService.findRecipesByCollection(this.collectionId)
          .then((recipes) => {
            this.recipes = recipes;
            this.collectionService.findModeratorForCollection(this.collectionId)
              .then((mod) => {
                this.mod = mod;
                this.collectionService.findRecipeListById(this.collectionId)
                  .then((coll) => {
                    this.collection = coll;
                    this.userService.profile()
                      .then((loggedInUser) => {
                        this.loggedInUser = loggedInUser;
                        if (loggedInUser !== null && loggedInUser.id === this.mod.id) {
                          this.enableRemove = true;
                        }
                      });
                  });
              });
          });
      });
  }

  removeRecipeFromList(listId, recipeId) {
    this.collectionService.removeRecipeFromList(listId, recipeId)
      .then(() => {
          this.collectionService.findRecipesByCollection(this.collectionId)
            .then((recipes) => {
              this.recipes = recipes;
            });
        }
      );
  }


    confirmDeleteRecipe(listId, recipeId) {
      const affirm = confirm('Are you sure you want to remove this recipe?');
      if (affirm) {
        this.removeRecipeFromList(listId, recipeId);
      }
    }

    logout(): void {
      this.userService.logout()
        .then(() => {
          this.router.navigate(['/login']);
        });
    }

  }
