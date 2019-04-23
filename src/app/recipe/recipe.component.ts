import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CommentServiceClient} from '../services/CommentServiceClient';
import {SaveServiceClient} from '../services/SaveServiceClient';
import {UserServiceClient} from '../services/UserServiceClient';
import {YummlyServiceClient} from '../services/YummlyServiceClient';
import {Recipe} from '../models/recipe.model.client';
import {CollectionServiceClient} from '../services/CollectionServiceClient';
import {RecipeServiceClient} from '../services/RecipeServiceClient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  userId: Number;
  userType: String;
  recipeListId: Number;
  recipeListName: String;
  editContent: String;
  recipeLists = [];
  recipeId;
  addToCollectionType: Boolean;
  comments = [];
  content: String;
  saves = [];
  savesByCurrUser = [];
  edittingId: number;
  saveId;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private commentService: CommentServiceClient,
              private saveService: SaveServiceClient,
              private userService: UserServiceClient,
              private yummlyService: YummlyServiceClient,
              private collectionServiceClient: CollectionServiceClient,
              private recipeServiceClient: RecipeServiceClient) {



    this.route.params.subscribe(params =>{
      console.log(params.recipeId);
      this.recipeId = params.recipeId;
    });
    //this.loadRecipe();
    this.initVariables();
  }

  ngOnInit() {
    this.edittingId = -1;
    this.userService.profile()
      .then((usr) => {
        this.userType = (usr === null) ? 'ANON' : usr.type;
        this.loadRecipe(usr);
        this.userId = (usr === null) ? 0 : usr.id;
        this.saveService.getSavesByUser(this.userId, this.recipeId)
          .then((c) => {
            this.savesByCurrUser = (c === null) ? this.savesByCurrUser : c;
            if (c != null && c.length > 0) {
              this.saveId = c[0].id;
            }
          });

      })
      .then(() => {
        this.commentService.getComments(this.recipeId)
          .then((c) => {
            console.log(c);
            this.comments = (c === null) ? this.comments : c;
          });
      })
      .then(() => {
        this.saveService.getSaves(this.recipeId)
          .then((c) => {
            console.log(c);
            this.saves = (c === null) ? this.saves : c;
          });
      });
  }

  loadRecipe(usr) {
    console.log('Loading recipe' + this.recipeId);
    this.yummlyService.fetchRecipe(this.recipeId).then((recipe) => {
      this.mapToRecipeModel(recipe);
      if (usr.type === 'MODERATOR') {
        console.log('1');
        this.collectionServiceClient.findRecipeListByModerator(usr.id).then(
          recipes => this.recipeLists = recipes
        );
        console.log('2');
        this.collectionServiceClient.findRecipeforModerator(usr.id, recipe.id).then(
          ans => {
            this.addToCollectionType = ans;
            console.log(ans);
          }
        );
      }
    });
  }

  addToCollection = (recipeList) => {
    this.recipeServiceClient.findRecipeById(this.recipeId)
      .then((recipe) => {
        if (recipe == null) {
          this.recipeServiceClient.addRecipe(this.recipe)
            .then((addedRecipe) => {
              this.recipe = addedRecipe;
              this.collectionServiceClient.addRecipeToList(recipeList.id, this.recipeId).then(
                collection => {
                  alert('Recipe added to ' + recipeList.name);
                  this.addToCollectionType = true;
                }
              );
            });
        } else {
          this.collectionServiceClient.addRecipeToList(recipeList.id, this.recipeId).then(
            collection => {
              alert('Recipe added to ' + recipeList.name);
              this.addToCollectionType = true;
            }
          );
        }
      });
  }

  initVariables() {
    this.saves = [];
    this.comments = [];
    this.userId = 0;
    this.savesByCurrUser = [];
  }

  mapToRecipeModel(yRecipe) {

    this.recipe = {
      id: yRecipe.id,
      name: yRecipe.name,
      images: yRecipe.images[0].hostedLargeUrl,
      sourceRecipeUrl: yRecipe.source.sourceRecipeUrl,
      sourceDisplayName: yRecipe.source.sourceDisplayName,
      ingredientLines: yRecipe.ingredientLines,
      totalTime: yRecipe.totalTime,
      numberOfServings: yRecipe.numberOfServings,
      cuisines: (yRecipe.attributes.cuisine === undefined) ? [] : yRecipe.attributes.cuisine
    };
    console.log(this.recipe);

  }

  addComment(): void {

    const comment = {
      content: this.content,
    };
    console.log(comment);

    this.recipeServiceClient.findRecipeById(this.recipeId)
      .then((recipe) => {
        if (recipe == null) {
          this.recipeServiceClient.addRecipe(this.recipe)
            .then((addedRecipe) => {
              this.recipe = addedRecipe;
              this.commentService.addComment(this.userId, this.recipeId, comment)
                .then((res) => {
                  this.comments.push(res);
                  this.content = null;
                });
            });
        } else {
          this.commentService.addComment(this.userId, this.recipeId, comment)
            .then((res) => {
              this.comments.push(res);
              this.content = null;
            });
        }
      });
  }

  editComment = (comment) => {
    this.edittingId = comment.id;
    this.editContent = comment.content;
  }

  saveEdit = (comment) => {
    this.commentService.editComment({
      id: comment.id,
      content: this.editContent
    }).then(
      comment1 => {
        this.comments.find(c => c.id === comment.id).content = this.editContent;
        this.edittingId = -1;
        this.editContent = '';
      }
    );
  }
  cancelEdit = (comment) => {
    this.edittingId = -1;
  }

  deleteComment(commendId): void {

    this.commentService.deleteComment(commendId)
      .then((res) => {
        this.commentService.getComments(this.recipeId)
          .then((c) => {
            this.comments = c;
          });
      });

  }

  saveRecipe(): void {

    const favorite = {};
    this.recipeServiceClient.findRecipeById(this.recipeId).then(
      recipe => {
        if (recipe === null) {
          this.recipeServiceClient.addRecipe(this.recipe).then(
            recipe1 => {
              this.saveService.saveRecipe(this.userId, this.recipeId, favorite)
                .then((res) => {
                  this.saves.push(res);
                  this.savesByCurrUser.push(res);
                });
            }
          );
        } else {
          this.saveService.saveRecipe(this.userId, this.recipeId, favorite)
            .then((res) => {
              this.saves.push(res);
              this.savesByCurrUser.push(res);
            });
        }
      }
    );
  }

  undoSaveRecipe(saveId): void {

    this.saveService.undoSaveRecipe(saveId)
      .then((res) => {
        this.saveService.getSaves(this.recipeId)
          .then((c) => {
            console.log('---' + c);
            this.saves = c;
            this.savesByCurrUser = [];
          });
      });

  }

  logout(): void {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

}
