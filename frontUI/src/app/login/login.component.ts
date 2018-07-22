import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from "@angular/http";
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: Http, private alerts: AlertsService) { }

  ngOnInit() {
  }
  onFormSubmit(data) {

    localStorage.setItem('email', data.email);

    sessionStorage.setItem('token', data.email);
    this.http.post('http://localhost:8080/user/login', data)
      .subscribe(res => {
        this.alerts.setDefaults('timeout', 2);
        const state = res.json().state;
        const message = res.json().message;
        // console.log(state+"-----"+message);
        if (state === 1) {
          this.alerts.setMessage(message, 'success');
          alert(message);
          this.router.navigate(['/home']);
        } else {
          this.alerts.setMessage(message, 'error');
          alert(message);
          this.router.navigate(['/login']);
        }
      });

  }

}
