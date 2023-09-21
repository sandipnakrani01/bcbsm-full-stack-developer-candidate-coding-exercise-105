import { Component } from '@angular/core';
import { FileUploadService } from '../services/file-upload-service';
import {  FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { EmailRequest } from '../domain/email-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent {
  
  fileUploadForm = new FormGroup({
    fromEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    toEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    subject: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]),
  });

  file: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  isError = false;

  constructor(private fileUploadService: FileUploadService, private router: Router) {}

  get form() { return this.fileUploadForm.controls; }

  isFieldInvalid(field: string) {
    
    return (
      (!this.fileUploadForm.get(field)?.valid && this.fileUploadForm.get(field)?.touched) ||
      (this.fileUploadForm.get(field)?.untouched )
    );
  }

  onSubmit(formDirective: FormGroupDirective) {

    if (this.fileUploadForm.invalid) {
      return;
    }

    const emailRequest: EmailRequest = new EmailRequest();
    emailRequest.fromEmail = this.fileUploadForm?.value?.fromEmail!;
    emailRequest.toEmail = this.fileUploadForm?.value?.toEmail!;
    emailRequest.subject = this.fileUploadForm?.value?.subject!;
    emailRequest.description = this.fileUploadForm?.value?.description!;
    emailRequest.file = this.file;

    this.fileUploadService.upload(emailRequest).subscribe(
        (response) => {
          this.resetData(formDirective);
          this.successMessage = "Record created."
        },
        (error) => {
          if(error.status == 401) {
            this.errorMessage = "Authentication Failure. Please enter correct credentials.";
            this.isError = true;
          }
          else{
            this.errorMessage = 'Technical Error Occured';
          }
        }
    );
  }

  resetData(formDirective: FormGroupDirective)  {
    formDirective.resetForm();
    this.fileUploadForm.reset();
    this.file = null;
  }

  public onViewEmailsClick(event: any) {
    this.router.navigate(['/email-listing']);
  }

  public onFileChange(event: any) {
    this.file = event.target.files[0];
  }

}
