import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCollectionComponent } from './recipe-collection/recipe-collection.component';

const appRoutes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'profile', component: ProfileComponent },
  { path:  'profile/:userId', component: ProfileComponent },
   { path: 'recipe/:recipeId', component: RecipeComponent },
   { path: 'search/results/:searchTerm' , component: SearchResultComponent },
   { path: 'collection/:collectionId', component: RecipeCollectionComponent },
  

];
export const routing = RouterModule.forRoot(appRoutes);
