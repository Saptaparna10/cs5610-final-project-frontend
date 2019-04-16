import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CommentServiceClient} from '../services/CommentServiceClient';
import {SaveServiceClient} from '../services/SaveServiceClient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipeId;
  comments = [];
  content: String;
  saves= [];
  savesByCurrUser= [];
  saveId;

  constructor(private route: ActivatedRoute, private commentService: CommentServiceClient, private saveService: SaveServiceClient) {
    this.route.params.subscribe(
      params => this.recipeId = params.recipeId);
  }

  ngOnInit() {
    this.commentService.getComments(this.recipeId)
      .then((c) => {
        this.comments=c;
      });

    this.saveService.getSaves(this.recipeId)
      .then((c) => {
        this.saves=c;
      });

    this.saveService.getSavesByUser(2, this.recipeId)
      .then((c) => {
        this.savesByCurrUser=c;
        if(c.length > 0) {
          this.saveId = c[0].id;
        }
        // else { this.enableSave=false; }
        console.log('save id: ' + this.saveId);
      });
  }

  addComment(): void {

    const comment = {
      content: this.content,
    }
    console.log(comment);
    this.commentService.addComment(2, this.recipeId, comment)
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
    this.saveService.saveRecipe(2, this.recipeId, favorite)
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
