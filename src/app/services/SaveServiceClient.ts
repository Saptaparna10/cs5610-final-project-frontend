import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class SaveServiceClient {

  constructor(private constants: Constants) { }

  SERVER_API_URL = this.constants.SERVER_API_URL;

  addComment = (userId, recipeId, comment) =>
    fetch(this.SERVER_API_URL + `/api/comment/user/${userId}/recipe/${recipeId}`, {
      method: 'post',
      body: JSON.stringify(comment),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        console.log(response)
        if (response.headers.get('content-type') === null) {
          return null;
        } else { return response.json(); }
      }
    )

  deleteComment = (commentId) =>
    fetch(this.SERVER_API_URL + `/api/comment/${commentId}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        console.log(response)
        if (response.headers.get('content-type') === null) {
          return null;
        } else { return response.json(); }
      }
    )

  getSaves = (recipeId) =>
    fetch(this.SERVER_API_URL + `/api/favorite/recipe/${recipeId}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )

}
