import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultComponent } from './search-result/search-result.component';

const appRoutes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'profile', component: ProfileComponent },
   { path: 'search', component: SearchResultComponent },

];
export const routing = RouterModule.forRoot(appRoutes);