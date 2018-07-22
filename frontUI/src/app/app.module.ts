import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { HttpModule } from '@angular/http';
import { AlertsModule } from 'angular-alert-module';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { HomeComponent } from './home/home.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      UserComponent,
      ResetpassComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      HttpModule,
      AlertsModule.forRoot(),

    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { animation: 'login' } },
      { path: 'signup', component: SignupComponent, data: { animation: 'signup' } },
      { path: 'resetpass', component: ResetpassComponent, data: { animation: 'resetpass' } },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, data: { animation: 'home' } },
      { path: '**', redirectTo: '/login' }
    ], {
        useHash: true
      })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
