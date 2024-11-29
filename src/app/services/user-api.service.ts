import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  date_of_birth: string;
  role: string;
  status: string;
  friends: number[];
}


@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = 'https://localhost:443/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  newUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user)
  }

  updateUserFriends(user: User): Observable<any> {
    return this.http.put<any>(this.apiUrl + `/${user.id}`, user)
  }

  deleteFriend(user: User): Observable<any> {
    return this.http.put<any>(this.apiUrl + `/${user.id}`, user)
  }
}
