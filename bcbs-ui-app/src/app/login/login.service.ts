import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseurl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    }),
  };

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http
      .post<User>('/api/login', JSON.stringify(user), this.httpOptions)
      .pipe(retry(2));
  }
}
