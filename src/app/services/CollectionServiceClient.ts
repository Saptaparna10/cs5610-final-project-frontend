import {Injectable} from '@angular/core';
import {Constants} from './Constants';

@Injectable()
export class CollectionServiceClient {

  constructor(private constants: Constants) {
  }

  SERVER_API_URL = this.constants.SERVER_API_URL;


  createCollection = (collection, modId) =>
    fetch(this.SERVER_API_URL + '/api/recipelist/' + modId, {
      method: 'post',
      body: JSON.stringify(collection),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get('content-type') === null) return null;
        else return response.json();
      }
    );

  updateCollection = (collection, cid) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${cid}`, {
      method: 'put',
      body: JSON.stringify(collection),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get('content-type') === null) return null;
        else return response.json();
      }
    );

  deleteCollection = (cId) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${cId}`,{
      method: 'delete',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get('content-type') === null) return null;
        else return response.json();
      }
    );


  findRecipeforModerator = (mid, rid) =>
    fetch(this.SERVER_API_URL + `/api/moderator/${mid}/recipe/${rid}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else {
            return response.json();
          }
        }
      );

  addRecipeToList = (listId, rid) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${listId}/recipe/${rid}`, {
      method: 'put',
    }).then(response => {
        if (response.headers.get('content-type') === null) return null;
        else return response.json();
      }
    );

  removeRecipeFromList = (listId, rid) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${listId}/recipe/${rid}`, {
      method: 'delete',
    }).then(response => {
        if (response.headers.get('content-type') === null) return null;
        else return response.json();
      }
    );

  findRecipeListByModerator = (mid) =>
    fetch(this.SERVER_API_URL + `/api/moderator/${mid}/recipelist`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else {
            return response.json();
          }
        }
      );

  findRecipeListById = (cid) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${cid}`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else {
            return response.json();
          }
        }
      );

  findRecipesByCollection = (cid) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${cid}/recipes`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else {
            return response.json();
          }
        }
      );

  findModeratorForCollection = (cid) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/${cid}/moderator`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else {
            return response.json();
          }
        }
      );

  findRecipsByCollectionName = (name) =>
    fetch(this.SERVER_API_URL + `/api/recipelist/name/${name}/recipes`)
      .then(response => {
          if (response.headers.get('content-type') === null) {
            return null;
          } else {
            return response.json();
          }
        }
      )

}
