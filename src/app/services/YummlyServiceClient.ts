
import { Injectable } from '@angular/core';
import { Constants } from './Constants';
@Injectable()
export class YummlyServiceClient {

    constructor(private constants: Constants) { }

    Y_BASE_SEARCH_URL = 'http://api.yummly.com/v1/api/recipes?_app_id='+this.constants.YUMMLY_APP_ID+
    '&_app_key='+this.constants.YUMMLY_APP_KEY+'&';


    //EXAMPLE: http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
    searchRecipeByTerm = searchTerm =>

        // 'q=onion+soup'
        fetch(this.Y_BASE_SEARCH_URL +'q='+ searchTerm).then(response => {
            console.log(response);
            if (response.headers.get("content-type") === null) return null;
            else return response.json()
        }
        );


} 