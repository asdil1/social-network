import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {FriendsComponent} from './friends/friends.component';
import {provideHttpClient} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { NewsComponent } from './news/news.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {AddNewsComponent} from './addnews/add-news.component';
import { RegisterComponent } from './register/register.component';

const config: SocketIoConfig = { url: 'https://localhost:443', options: {} }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    FriendsComponent,
    AdminComponent,
    NewsComponent,
    AddNewsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
