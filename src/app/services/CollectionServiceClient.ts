import {Injectable} from '@angular/core';
import {Constants} from './Constants';

@Injectable()
export class CollectionServiceClient {

  constructor(private constants: Constants) { }

  SERVER_API_URL = this.constants.SERVER_API_URL;

  findRecipeforModerator = (mid, rid) =>
    fetch(this.SERVER_API_URL + `/api/moderator/${mid}/recipe/${rid}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )
  createRecipeList = (recipeList) =>
    fetch(this.SERVER_API_URL + '/api/recipelist', {
      method: 'post',
      body: JSON.stringify(recipeList),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get("content-type") === null) return null;
        else return response.json()
      }
    );

  addRecipeToList = (listId, rid) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${listId}/recipe/${rid}`,{
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    })
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )
  findRecipeListByModerator = (mid) =>
    fetch(this.SERVER_API_URL + `/api/moderator/${mid}/recipelist`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )

  findRecipeListByModandName = (mid, name) =>
    fetch(this.SERVER_API_URL + `/api/moderator/${mid}/recipelist/${name}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else { return response.json(); }
        }
      )

}
