import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {News} from './news-api.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {}

  onUserUpdate(): Observable<any> {
    return this.socket.fromEvent("userUpdated");
  }

  onNewsUpdate(): Observable<News[]> {
    return this.socket.fromEvent("newsUpdated");
  }
}
