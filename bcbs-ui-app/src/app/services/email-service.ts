import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { EmailsResponse } from '../domain/email-response';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
    
  baseUrl = 'http://localhost:8080';
    
  constructor(private http:HttpClient, private authService: AuthService) { }

  getEmails():Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': `Bearer ${this.authService.token}`,
      }),
    };

    return this.http.get<EmailsResponse[]>('/api/email', httpOptions)
 
  }
}