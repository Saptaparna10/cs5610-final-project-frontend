import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YummlyServiceClient } from '../services/YummlyServiceClient';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchTerm: String;
  results:[];

  constructor(private activatedRoute: ActivatedRoute,private yummlyService: YummlyServiceClient) {
    this.results=[];
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      console.log(this.searchTerm);
      this.search();
      
    });
  }

  search(): void {
   
    this.yummlyService.searchRecipeByTerm(this.searchTerm).then((searchResult) => {
             
      if(searchResult!=null && searchResult.matches!=null){
        this.results = searchResult.matches;
      console.log(this.results);
      }
       
     });
    

  }
 
 
}
