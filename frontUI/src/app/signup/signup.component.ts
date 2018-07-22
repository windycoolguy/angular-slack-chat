import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { AlertsService } from 'angular-alert-module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private http: Http, private alerts: AlertsService) { }

  ngOnInit() {

  }

  onFormSubmit(form) {

    // this.alerts.setDefaults('timeout', 2);
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    // const pass2 = form.value.confirmpassword;
    if (!name) {
      this.alerts.setMessage('Need Username!', 'error');
      return;
    }
    if (!email) {
      this.alerts.setMessage('Need Email!', 'error');
      return;
    }
    if (name && email && password) {
      const data = {'name': name, 'email': email , 'password': password};
      // console.log(data);return;
      this.http.post('http://localhost:8080/user/register', data)
      .subscribe( res => {
          const state = res.json().state;
          const message = res.json().message;
          if (state === 1) {
            this.alerts.setMessage(message, 'success');
            this.router.navigate(['/user']);
          } else {
            this.alerts.setMessage(message, 'error');
          }
        });
    } else {
      // this.alerts.setMessage('Password does not March!', 'error');
      this.router.navigate(['/register']);
    }
    // this.router.navigateByUrl('/');
  }
}
