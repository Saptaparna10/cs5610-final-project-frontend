import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CommentServiceClient} from '../services/CommentServiceClient';
import {SaveServiceClient} from '../services/SaveServiceClient';
import {UserServiceClient} from '../services/UserServiceClient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  userId;
  recipeId;
  comments = [];
  content: String;
  saves = [];
  savesByCurrUser = [];
  saveId;

  constructor(private route: ActivatedRoute, private commentService: CommentServiceClient,
              private saveService: SaveServiceClient, private userService: UserServiceClient) {
    this.route.params.subscribe(
      params => this.recipeId = params.recipeId);
  }

  ngOnInit() {
    this.userService.profile()
      .then((usr) => {
        console.log('user id' + usr.id);
        this.userId = usr.id;
      })
      .then(() => {
        this.commentService.getComments(this.recipeId)
          .then((c) => {
            this.comments = c;
          });
        })
      .then(() => {
        this.saveService.getSaves(this.recipeId)
          .then((c) => {
            this.saves = c;
          });
      })
      .then(() => {
        this.saveService.getSavesByUser(this.userId, this.recipeId)
        .then((c) => {
          this.savesByCurrUser = c;
          if(c.length > 0) {
            this.saveId = c[0].id;
          }
        });
    });

  }

  addComment(): void {

    const comment = {
      content: this.content,
    }
    console.log(comment);
    this.commentService.addComment(this.userId, this.recipeId, comment)
      .then((res) => {
        this.comments.push(res);
    });

  }

  deleteComment(commendId): void {

    this.commentService.deleteComment(commendId)
      .then((res) => {
        this.commentService.getComments(this.recipeId)
          .then((c) => {
            this.comments=c;
          });
      });

  }

  saveRecipe(): void {

    const favorite = {
    }
    this.saveService.saveRecipe(this.userId, this.recipeId, favorite)
      .then((res) => {
        this.saves.push(res);
        this.savesByCurrUser.push(res);
      });

  }

  undoSaveRecipe(saveId): void {

    this.saveService.undoSaveRecipe(saveId)
      .then((res) => {
        this.saveService.getSaves(this.recipeId)
          .then((c) => {
            console.log('---'+c)
            this.saves=c;
            this.savesByCurrUser=[];
          });
      });

  }

}
