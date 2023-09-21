import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../domain/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
  });

  submitted = false;
  token!: string;
  errorMessage!: string;
  isError = false;
  formSubmitAttempt: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
  ) {}
  
  isFieldInvalid(field: string) {
    
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.formSubmitAttempt = true;
    const user: User = new User();
    user.userName = this.loginForm?.value?.userName!
    user.password = this.loginForm?.value?.password!
    
    this.loginService.login(user).subscribe((res) => {
      this.authService.token = res.token;
      this.authService.navigateToEmail();
      this.router.navigate(['/email']);
    }, (err) => {
      if(err.status == 401) {
        this.errorMessage = "Authentication Failure. Please enter correct credentials.";
        this.isError = true;
      }
      else{
        this.errorMessage = 'Technical Error Occured';
      }
    }
    );

  }

}
