import {Injectable} from '@angular/core';

@Injectable()
export class Constants {
  // local server
  //SERVER_API_URL = 'http://localhost:8080';

  // heroku server

  SERVER_API_URL = ' https://alwayshungry.herokuapp.com';

  // Yummly api key
  YUMMLY_APP_ID = 'f9d4e019';

  // Yummly api password
  YUMMLY_APP_KEY = '13251a7e420fe3d168b319220dbdcbfb';
}
