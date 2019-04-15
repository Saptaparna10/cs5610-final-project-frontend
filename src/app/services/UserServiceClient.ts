
import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class UserServiceClient {

  constructor(private constants: Constants) { }

  SERVER_API_URL = this.constants.SERVER_API_URL;



  logInUser = user =>
    fetch(this.SERVER_API_URL + '/api/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get("content-type") === null) return null;
        else return response.json()
      }
    );

  registerUser = user =>
    fetch(this.SERVER_API_URL + '/api/registeredUser/register', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        if (response.headers.get("content-type") === null) return null;
        else return response.json()
      }
    );
  registerModerator = user =>
    fetch(this.SERVER_API_URL + '/api/moderator/register', {
      method: 'post',
      body: JSON.stringify(user),
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
