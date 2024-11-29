import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {UserApiService} from '../services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    username: '',
    email: '',
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private userApiService: UserApiService,
  ) {}

  protected onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      // делаем запрос на сервер
      this.userApiService.getUsers().subscribe({
        next: (users) => {
          const foundUser = users.find(u => u.name === this.user.username && u.email === this.user.email);

          if (foundUser) {
            this.userService.setUser(foundUser);
            this.router.navigate(['/profile']).then(r => console.log(r));
          } else {
            alert("Пользователь не найден");
          }
        },
        error: (error) => {
          console.error("Ошибка при получении пользователей", error);
          alert("Ошибка подключения к серверу");
        }
      });
    } else {
      alert("Форма не валидна");
    }
  }
}
