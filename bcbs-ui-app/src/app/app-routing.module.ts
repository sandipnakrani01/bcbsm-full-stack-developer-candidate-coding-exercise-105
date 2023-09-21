import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { EmailListingComponent } from './email/email-listing/email-listing.component';

const routes: Routes = [
  { path: 'email', component: EmailComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'email-listing', component: EmailListingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
