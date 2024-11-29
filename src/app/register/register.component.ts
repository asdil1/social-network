import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserApiService} from '../services/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  user = {
    id: 0,
    name: '',
    email: '',
    date_of_birth: '',
    role: '',
    status: '',
    friends: [],
  };

  maxDate: string = '';

  constructor(
    private router: Router,
    private userApiService: UserApiService,
  ) {}

  ngOnInit() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    this.maxDate = today.toISOString().split('T')[0];
  }

  protected onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.userApiService.getUsers().subscribe({
        next: (users) => {
          const isUserExists = users.find(u => u.name === this.user.name || u.email === this.user.email);

          if (isUserExists){
            alert("Пользователь с таким именем или email уже существует.")

          } else {
            this.userApiService.newUser(this.user).subscribe({
              next: (response) => {
                console.log(response);
                alert(`Успешная регистрация: ${response.msg}`);
                this.router.navigate(['/login']).then(r => console.log(r));
              },
              error: (error) => {
                console.log(error.message);
                alert("Ошибка подключения к серверу");
              }
            });
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      alert("Форма не валидна");
    }
  }
}
