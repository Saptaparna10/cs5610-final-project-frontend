import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class CommentServiceClient {

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



  getComments = (recipeId) =>
    fetch(this.SERVER_API_URL + `/api/comment/recipe/${recipeId}`)
    .then(response => {
        if (response.headers.get('content-type') === null) {
          return null;
        } else { return response.json(); }
      }
    )

}
