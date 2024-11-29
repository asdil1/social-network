import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../services/user-api.service';
import {News, NewsApiService} from '../services/news-api.service';
import {WebSocketService} from '../services/web-socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  news: News[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private newsApiService: NewsApiService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadUserNews();
    this.updateUser();
    this.updateNews();
  }

  private updateNews(){
    this.webSocketService.onNewsUpdate().subscribe({
      next: (news) => {
        this.news = news.filter(n => n.user_id === this.user?.id);
      },
      error: (error) => {
        console.error("Ошибка получения новостей", error);
        alert("Ошибка подключения к серверу");
      }
    })
  }

  private updateUser(){
    this.webSocketService.onUserUpdate().subscribe({
      next: (data: any) => {
        if (this.user && this.user.id === data.user_id) {
          if (data.newRole) this.user.role = data.newRole;
          if (data.newStatus) this.user.status = data.newStatus;
          if (data.newName) this.user.name = data.newName;
          if (data.newEmail) this.user.email = data.newEmail;
          if (data.newDob) this.user.date_of_birth = data.newDob;

          this.userService.updateUser(this.user);
          console.log("Данные обновлены", data);
        }
      },
      error: (error) => {
        console.error("Ошибка при обновлении пользователя", error);
      }
    });
  }

  private loadUser(){
    this.user = this.userService.getUser();
    if(!this.user) {
      this.router.navigate(['/login']).then(r => console.log(r));
    }
  }

  private loadUserNews(){
    this.newsApiService.getNews().subscribe({
      next: (news) => {
        this.news = news.filter(n => n.user_id === this.user?.id);
      },
      error: (error) => {
        console.error("Ошибка получения новостей", error);
        alert("Ошибка подключения к серверу");
      }
    })
  }

  protected logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']).then(r => console.log(r));
  }
}
