import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserServiceClient } from './services/UserServiceClient';
import { Constants } from './services/Constants';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RecipeComponent } from './recipe/recipe.component';
import {CommentServiceClient} from './services/CommentServiceClient';
import { YummlyServiceClient } from './services/YummlyServiceClient';
import {SaveServiceClient} from './services/SaveServiceClient';
import {FollowServiceClient} from './services/FollowServiceClient';
import { RecipeCollectionComponent } from './recipe-collection/recipe-collection.component';
import { CollectionServiceClient } from './services/CollectionServiceClient';
import {RecipeServiceClient} from './services/RecipeServiceClient';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchResultComponent,
    RecipeComponent,
    RecipeCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    NgxPaginationModule
  ],

  providers: [UserServiceClient, CommentServiceClient, SaveServiceClient, CollectionServiceClient, FollowServiceClient,
    RecipeServiceClient,
    Constants,
    YummlyServiceClient,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
