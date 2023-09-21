import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { EmailRequest } from '../domain/email-request';
import { AuthService } from '../auth/auth.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  baseUrl = 'http://localhost:8080';
    
  constructor(private http:HttpClient, private authService: AuthService) { }

  upload(emailRequest: EmailRequest):Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': `Bearer ${this.authService.token}`,
      }),
    };
    const formData = new FormData(); 
    formData.append("file", emailRequest.file!, emailRequest.file!.name);
    formData.append("fromEmail", emailRequest.fromEmail);
    formData.append("toEmail", emailRequest.toEmail);
    formData.append("subject", emailRequest.subject);
    formData.append("description", emailRequest.description);
    
    return this.http.post<FormData>('/api/email',  formData, httpOptions);
 
  }
}