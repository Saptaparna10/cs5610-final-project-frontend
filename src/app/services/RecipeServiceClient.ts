import {Injectable} from '@angular/core';
import {Constants} from './Constants';

@Injectable()
export class RecipeServiceClient {

  constructor(private constants: Constants) { }

  SERVER_API_URL = this.constants.SERVER_API_URL;

  addRecipe = (recipe) =>
    fetch(this.SERVER_API_URL + '/api/recipe', {
      method: 'post',
      body: JSON.stringify(recipe),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get("content-type") === null) return null;
        else return response.json()
      }
    );

  findRecipeById = (rid) =>
    fetch(this.SERVER_API_URL + `/api/recipe/${rid}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )
}
