import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {News, NewsApiService} from '../services/news-api.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.css'
})
export class AddNewsComponent implements OnInit {
  newMessage: News = {
    id: 0,
    user_id: 0,
    title: '',
    message: '',
    timestamp: '',
  }
  constructor(
    private userService: UserService,
    private newsApiService: NewsApiService
  ) {}

  ngOnInit(){
    const currUser = this.userService.getUser();
    this.newMessage.user_id = currUser.id;
  }

  protected onSubmit(newsForm: NgForm) {
    if (newsForm.valid) {
      this.newMessage.timestamp = new Date().toISOString().split('T')[0];
      this.newsApiService.addMessage(this.newMessage);
    } else {
      alert("Форма не валидна");
    }
  }
}
