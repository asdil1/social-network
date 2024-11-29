import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {News, NewsApiService} from '../services/news-api.service';
import {User, UserApiService} from '../services/user-api.service';
import {WebSocketService} from '../services/web-socket.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  users: User[] = [];

  constructor(
    protected userService: UserService,
    private newsApiService: NewsApiService,
    private userApiService: UserApiService,
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNews();
    this.loadUsers();
    this.updateNews();
  }

  private updateNews() {
    this.webSocketService.onNewsUpdate().subscribe({
      next: (news) => {
        const currentUser = this.userService.getUser();
        this.news = news.filter(n => n.user_id === currentUser.id || currentUser.friends.includes(n.user_id));
        this.news.sort((a, b) => b.id - a.id);
        console.log(this.news);
      },
      error: (error) => {
        console.error("Ошибка получения новостей", error);
        alert("Ошибка подключения к серверу");
      }
    });
  }

  private loadUsers(){
    this.userApiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error("Ошибка получения пользователей", error);
        alert("Ошибка подключения к серверу");
      }
    });
  }

  private loadNews() {
    const currentUser = this.userService.getUser();
    if (currentUser) {
      this.newsApiService.getNews().subscribe({
        next: (news) => {
          this.news = news.filter(n => n.user_id === currentUser.id || currentUser.friends.includes(n.user_id));
          this.news.sort((a, b) => b.id - a.id);
          console.log(this.news);
        },
        error: (error) => {
          console.error("Ошибка получения новостей", error);
          alert("Ошибка подключения к серверу");
        }
      });
    }
  }

  protected getUserName(user_id: number): string | undefined {
    const user = this.users.find(user => user.id === user_id);
    return user?.name;
  }

  protected logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']).then(r => console.log(r));
  }
}
