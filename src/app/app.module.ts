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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchResultComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule
  ],

  providers: [UserServiceClient, CommentServiceClient, SaveServiceClient, FollowServiceClient,
    Constants,
    YummlyServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
