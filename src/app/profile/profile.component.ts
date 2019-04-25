import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/UserServiceClient';
import {ActivatedRoute, Router} from '@angular/router';
import {FollowServiceClient} from '../services/FollowServiceClient';
import {RecipeCollection} from '../models/recipe-collection.model.client';
import {CollectionServiceClient} from '../services/CollectionServiceClient';
import {Recipe} from '../models/recipe.model.client';
import {SaveServiceClient} from '../services/SaveServiceClient';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName: String;
  lastName: String;
  username: String;
  password: String;
  confirmPassword: String;
  phoneNum: Number;
  role: String;
  image: String;
  email: String;
  userId;
  loggedInUserId;
  loggedInUserRole;
  enableEdit: Boolean;
  followers = [];
  following = [];
  isFollowing;
  disableFollow;

  //Collection attributes:
  newCollection: RecipeCollection;
  recipeCollections: RecipeCollection[] = [];

  savedRecipes: Recipe[] = [];


  tabOptions: string[] = ['Personal', 'Saved Recipes', 'Recipe lists', 'Following', 'Followers'];
  recipes: [{
    image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
    title: 'Chicken Tikka Masala',
    description: 'This authentic Indian dish is served with ...',
  }];
  selectedTabOption = this.tabOptions[0];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserServiceClient,
              private followService: FollowServiceClient,
              private collectionService: CollectionServiceClient,
              private saveService: SaveServiceClient) {
    this.route.params.subscribe(
      params => {
        this.userId = params.userId;
        this.loadProfile();
      });


    this.recipes = [{
      image_url: 'https://assets.epicurious.com/photos/5c8fc9eb1808bd2c8ed6ca7b/16:9/w_1280%2Cc_limit/Cook-This-Now-Torn-Tofu-Hero-Alt-05032019.jpg',
      title: 'Chicken Tikka Masala',
      description: 'This authentic Indian dish is served with ...',
    }];

  }

  loadProfile() {
    console.log('Load profile!');
    this.userService.profile().then((res) => {
      /* anonymous check */
    
      if (res == null && this.userId == null) {
        this.router.navigate(['/login']);
      }
      if (res !== null) {
        this.loggedInUserId = res.id;
        this.loggedInUserRole = res.type;
      }

      if (this.loggedInUserId == null)
        this.disableFollow = true;
      if (this.loggedInUserId == this.userId) {
        this.router.navigate(['/profile']);
      }
      if (this.userId == null) {
       
        this.userService.profile().then((loggedInUser) => {
        
          this.firstName = loggedInUser.firstName;
          this.lastName = loggedInUser.lastName;
          this.username = loggedInUser.username;
          this.password = loggedInUser.password;
          this.confirmPassword = loggedInUser.password;
          this.role = loggedInUser.type;
          this.phoneNum = loggedInUser.phoneNumber;
          this.email = loggedInUser.email;
          this.image = loggedInUser.imgurl;
          this.enableEdit = true;

       

        }).then(() => {
          if (this.role === 'MODERATOR') {
          
            this.followService.getFollowers(this.loggedInUserId)
              .then((res) => this.followers = res);
            this.collectionService.findRecipeListByModerator(this.loggedInUserId).then((cols) => {
             
              this.recipeCollections = cols;
            });
          } else {
          
            this.followService.getFollowing(this.loggedInUserId)
              .then((res) => {
                this.following = res;
                this.saveService.getAllSavedRecipesByUser(this.loggedInUserId)
                  .then((savedRecipes) => {
                    this.savedRecipes = savedRecipes;
                  });

              });
          }
        });
      } else {
        this.userService.getUserById(this.userId).then((usr) => {
         
          this.firstName = usr.firstName;
          this.lastName = usr.lastName;
          this.username = usr.username;
          this.password = usr.password;
          this.confirmPassword = usr.password;
          this.role = usr.type;
          this.phoneNum = usr.phoneNumber;
          this.email = usr.email;
          this.image = usr.imgurl;
          this.enableEdit = false;

        })
          .then(() => {
            if (this.role === 'MODERATOR') {
              this.selectedTabOption = this.tabOptions[2];
            
              this.followService.getIfUserFollowingMod(this.loggedInUserId, this.userId)
                .then((res) => {
                
                  this.isFollowing = res;
                  if (this.role == this.loggedInUserRole) {
                    this.disableFollow = true;
                  }
                });
              this.followService.getFollowers(this.userId)
                .then((res) => {
               
                  this.followers = res;
                  this.collectionService.findRecipeListByModerator(this.userId).then((cols) => {
                   
                    this.recipeCollections = cols;
                  });
                });

            } else {
              this.selectedTabOption = this.tabOptions[1];
           
              this.followService.getFollowing(this.userId)
                .then((res) => {
                
                  this.following = res;
                  this.saveService.getAllSavedRecipesByUser(this.userId)
                    .then((savedRecipes) =>{ this.savedRecipes = savedRecipes});
                });
            }
          });
      }

    });
  }


  ngOnInit() {

    this.clearCollectionFields();

  }

  logout(): void {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  clearCollectionFields(): void {
    this.newCollection = {
      id: 0,
      name: '',
      imageURL: 'https://images.unsplash.com/photo-1553639766-450abeeaf06d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60',
      recipes: []
    };
  }

  follow(): void {

    if (this.loggedInUserId === this.userId) {
      return;
    }

    this.followService.follow(this.loggedInUserId, this.userId)
      .then((res) => {
        this.isFollowing = true;
        this.followers.push(res);
      });

  }

  unfollow(): void {

    if (this.loggedInUserId === this.userId) {
      return;
    }
    this.followService.unfollow(this.loggedInUserId, this.userId)
      .then((res) => {
        this.followService.getFollowers(this.userId)
          .then((c) => {
            this.isFollowing = false;
            this.followers = c;
          });
      });

  }


  createCollection(id) {
 
    if (id === 0) {
   
      this.collectionService.createCollection(this.newCollection, this.loggedInUserId)
        .then((res) => {
       
          this.collectionService.findRecipeListByModerator(this.loggedInUserId).then((cols) => {
          
            this.recipeCollections = cols;
            this.clearCollectionFields();
          });

          // fetch all collections and reload
        });
    } else {
   
      this.collectionService.updateCollection(this.newCollection, id)
        .then((res) => {
        
          this.collectionService.findRecipeListByModerator(this.loggedInUserId)
            .then((cols) => {
            
              this.recipeCollections = cols;
              this.clearCollectionFields();
            });
        });
    }


  }

  confirmDeleteCollection(cid) {
    const affirm = confirm('Are you sure you want to delete this collection?');
    if (affirm) {
      this.collectionService.deleteCollection(cid)
        .then(() => {
          this.collectionService.findRecipeListByModerator(this.loggedInUserId).then((cols) => {
         
            this.recipeCollections = cols;
          });
        });
    }
  }

  populate(cid) {
    this.collectionService.findRecipeListById(cid)
      .then((collection) => {
       
        this.newCollection = {
          id: collection.id,
          name: collection.name,
          imageURL: collection.imageURL,
          recipes: collection.recipes
        };
      });

  }

  updateProfile() {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNum,
      imgurl: this.image,
      type: this.role
    }
    this.userService.updateUser(this.loggedInUserId, user)
      .then((res) => {
      
        this.loadProfile();
      });
  }


}
