
import { Injectable } from '@angular/core';
import { Constants } from './Constants';

@Injectable()
export class FollowServiceClient {

  constructor(private constants: Constants) { }

  SERVER_API_URL = this.constants.SERVER_API_URL;

  follow = (userId, moderatorId) =>
    fetch(this.SERVER_API_URL + `/api/registereduser/follow/${userId}/${moderatorId}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    }).then(response => {
        console.log(response)
        if (response.headers.get('content-type') === null) {
          return null;
        } else {
          return response.json();
        }
      }
    )

    getFollowers = (modId) =>
      fetch(this.SERVER_API_URL + `/api/moderator/registereduser/follower/${modId}`)
        .then(response => {
            console.log(response)
            if (response.headers.get('content-type') === null) {
              return null;
            } else {
              return response.json();
            }
          }
        )

  getFollowing = (userId) =>
    fetch(this.SERVER_API_URL + `/api/registereduser/${userId}/following`)
      .then(response => {
          console.log(response)
          if (response.headers.get('content-type') === null) {
            return null;
          } else {
            return response.json();
          }
        }
      )
}
