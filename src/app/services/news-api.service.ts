import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

export interface News {
  id: number;
  user_id: number;
  title: string;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private apiUrl = 'https://localhost:443/api/news';

  constructor(private http: HttpClient, private router: Router) {}

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }


  addMessage(news: News) : void {
    this.http.post<any>(this.apiUrl, news).subscribe({
      next: (response) => {
        console.log(response);
        alert(`Ответ сервера: ${response.msg}`)
      },
      error: (error) => {
        console.error("Ошибка добавления сообщения", error);
        alert("Ошибка подключения к серверу");
      }
    });
    this.router.navigate(['/profile']).then(r => console.log(r));;
  }
}
