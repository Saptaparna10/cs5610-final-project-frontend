import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RecipeComponent } from './recipe/recipe.component';

const appRoutes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'profile', component: ProfileComponent },  
   { path: 'recipe/:recipeId', component: RecipeComponent },
   { path: 'search/results/:searchTerm', component: SearchResultComponent },
  

];
export const routing = RouterModule.forRoot(appRoutes);
