import { Component, OnInit } from '@angular/core';
import { YummlyServiceClient } from '../services/YummlyServiceClient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm: String;
  constructor(private router: Router, private yummlyService: YummlyServiceClient) { }

  ngOnInit() {
  }

  search(): void {
   
    this.router.navigate(['/search/results/'+this.searchTerm ]);
    

  }

}
