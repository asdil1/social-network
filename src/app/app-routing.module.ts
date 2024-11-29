import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {FriendsComponent} from './friends/friends.component';
import {AdminComponent} from './admin/admin.component';
import {NewsComponent} from './news/news.component';
import {AddNewsComponent} from './addnews/add-news.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent},
  {path: "friends", component: FriendsComponent},
  {path: "admin", component: AdminComponent},
  {path: "news", component: NewsComponent},
  {path: "add-news", component: AddNewsComponent},
  {path: '', redirectTo: "/login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
