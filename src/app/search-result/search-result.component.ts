import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YummlyServiceClient } from '../services/YummlyServiceClient';
import { UserServiceClient } from '../services/UserServiceClient';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchTerm: String;
  results: [];
  loggedInUser;
  pageNumber: number = 1;
  totalResultCount: number = 0;
  resultStartIndex : number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private yummlyService: YummlyServiceClient,
    private userService: UserServiceClient) {
    this.results = [];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];

      this.search();

    });
    this.userService.profile()
      .then((user) => {
        this.loggedInUser = user;
      })
  }

  search(): void {

    this.yummlyService.searchRecipeByTerm(this.searchTerm, this.resultStartIndex).then((searchResult) => {

      if (searchResult != null && searchResult.matches != null) {
        this.results = searchResult.matches;
        this.totalResultCount = searchResult.totalMatchCount;
        console.log(searchResult);
      }

    });


  }

  pageChanged(newPageNumber){

    console.log(newPageNumber);
    this.resultStartIndex = (newPageNumber-1)*10;
    this.pageNumber = newPageNumber;
    this.search();
  }

  logout(): void {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }


}
