import { Injectable } from '@angular/core';
import {User} from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setUser(user: User) {
    // сохраняем пользователя пока вкладка открыта
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  updateUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user): null;
  }

  clearUser() {
    sessionStorage.removeItem('user');
  }
}
