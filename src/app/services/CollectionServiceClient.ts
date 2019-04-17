
import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class CollectionServiceClient {

  constructor(private constants: Constants) { }

  SERVER_API_URL = this.constants.SERVER_API_URL;



  createCollection = collection =>
    fetch(this.SERVER_API_URL + '/api/recipelist', {
      method: 'post',
      body: JSON.stringify(collection),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get("content-type") === null) return null;
        else return response.json()
      }
    );

  

}
