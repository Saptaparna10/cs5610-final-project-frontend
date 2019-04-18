import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class SaveServiceClient {

  constructor(private constants: Constants) { }

  SERVER_API_URL = this.constants.SERVER_API_URL;

  saveRecipe = (userId, recipeId, favorite) =>
    fetch(this.SERVER_API_URL + `/api/favorite/user/${userId}/recipe/${recipeId}`, {
      method: 'post',
      body: JSON.stringify(favorite),
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

  undoSaveRecipe = (saveId) =>
    fetch(this.SERVER_API_URL + `/api/favorite/${saveId}`, {
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

  getSavesByUser = (userId, recipeId) =>
    fetch(this.SERVER_API_URL + `/api/favorite/user/${userId}/recipe/${recipeId}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )

  getAllSavedRecipesByUser = (userId) =>
    fetch(this.SERVER_API_URL + `/api/favorite/user/${userId}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )

}
