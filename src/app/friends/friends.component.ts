import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User, UserApiService} from '../services/user-api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit {
  friends: User[] = []; // список друзей текущего пользователя
  friendName: string = '';

  constructor(
    protected userService: UserService,
    private userApiService: UserApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFriends();
  }

  private loadFriends() {
    const currentUser = this.userService.getUser();
    if (currentUser) {
      this.userApiService.getUsers().subscribe({
        next: (users) => {
          this.friends = users.filter(u => currentUser.friends.includes(u.id));
        },
        error: (error) => {
          console.error("Ошибка получения пользователей", error);
          alert("Ошибка подключения к серверу");
        }
      });
    }
  }

  protected addFriend() {
    this.userApiService.getUsers().subscribe({
      next: (users) => {
        const foundFriend = users.find(u => u.name == this.friendName);
        if (foundFriend) {
          const currentUser = this.userService.getUser();
          currentUser.friends.push(foundFriend.id);

          this.userApiService.updateUserFriends(currentUser).subscribe({
            next: (response) => {
              console.log(response);
              alert("Друг добавлен");
            },
            error: (error) => {
              console.log(error);
              alert("Ошибка добавления друга");
            }
          });

          this.userService.setUser(currentUser);
          this.loadFriends();
          this.friendName = '';

        } else {
          alert("Такого пользователя нет");
        }
      },
      error: (error) => {
        console.log(error);
        alert("Ошибка подключения к серверу");
      }
    });
  }

  protected deleteFriend(friendId: number) {
    const currUser = this.userService.getUser();
    if (currUser) {
      currUser.friends.splice(currUser.friends.indexOf(friendId), 1);
      this.userApiService.deleteFriend(currUser).subscribe({
        next: (response) => {
          console.log(response.message);
          alert(`Ответ сервера: ${response.message}`);

          this.userService.setUser(currUser);
          this.loadFriends();

        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  protected logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']).then(r => console.log(r));
  }
}
