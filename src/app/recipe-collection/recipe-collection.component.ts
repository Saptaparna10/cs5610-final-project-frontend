import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CollectionServiceClient} from '../services/CollectionServiceClient';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})
export class RecipeCollectionComponent implements OnInit {

  collectionId;
  mod;
  collection;
  recipes: [];


  constructor(private route: ActivatedRoute,
              private collectionService: CollectionServiceClient) {
    this.recipes = [];


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

  }
