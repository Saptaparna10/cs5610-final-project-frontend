
import { Injectable } from '@angular/core';
import { Constants } from './Constants';
@Injectable()
export class YummlyServiceClient {

    constructor(private constants: Constants) { }

    Y_BASE_SEARCH_URL = 'https://api.yummly.com/v1/api/recipes?_app_id=' + this.constants.YUMMLY_APP_ID +
        '&_app_key=' + this.constants.YUMMLY_APP_KEY + '&';

    Y_REQUIRE_PICS = '&requirePictures=true';
    Y_PAGI_MAX_RESULT = '&maxResult=10';
    Y_PAGI_RESULT_START = '&start=';
    Y_BASE_GET_RECIPE_BEGIN = 'https://api.yummly.com/v1/api/recipe/';

    Y_BASE_GET_RECIPE_END = '?_app_id=' + this.constants.YUMMLY_APP_ID + '&_app_key=' + this.constants.YUMMLY_APP_KEY;


    //EXAMPLE: http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup
    searchRecipeByTerm = (searchTerm, newStartIndex) =>


        fetch(this.Y_BASE_SEARCH_URL + 'q=' + searchTerm + this.Y_REQUIRE_PICS + this.Y_PAGI_MAX_RESULT + this.Y_PAGI_RESULT_START + newStartIndex).then(response => {
         
            if (response.headers.get("content-type") === null) return null;
            else return response.json()
        });


    //EXAMPLE: http://api.yummly.com/v1/api/recipe/Simple-Vanilla-Cake-975825?_app_id=f9d4e019&_app_key=13251a7e420fe3d168b319220dbdcbfb
    fetchRecipe = recipeId =>


        fetch(this.Y_BASE_GET_RECIPE_BEGIN + recipeId + this.Y_BASE_GET_RECIPE_END).then(response => {
         
            if (response.headers.get("content-type") === null) return null;
            else return response.json()
        });


} 
