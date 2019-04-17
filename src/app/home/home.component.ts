import { Component, OnInit } from '@angular/core';
import { YummlyServiceClient } from '../services/YummlyServiceClient';
import { Router } from '@angular/router';
import {UserServiceClient} from '../services/UserServiceClient';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm: String;
  experts = [];
  user;

  constructor(private router: Router, private yummlyService: YummlyServiceClient, private userService: UserServiceClient) { }

  ngOnInit() {
    this.userService.profile()
      .then((res) => this.user = res)
    this.userService.getAllModerators()
      .then((mods) => this.experts = mods);
  }

  search(): void {

    this.router.navigate(['/search/results/'+this.searchTerm ]);


  }

}
