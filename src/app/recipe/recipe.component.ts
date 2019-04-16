import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {CommentServiceClient} from '../services/CommentServiceClient';
import {SaveServiceClient} from '../services/SaveServiceClient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipeId;
  comments = []
  content: String;
  saves = [];

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

    console.log(this.saves);
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


}
