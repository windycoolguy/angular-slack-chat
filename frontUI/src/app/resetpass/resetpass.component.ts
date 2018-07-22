import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  constructor(private router: Router, private http: Http, private alerts: AlertsService) { }

  ngOnInit() {

  }

  onFormSubmit(form) {
    const email = localStorage.getItem('email');
    if (email === '') {
      this.router.navigate(['/login']);
    }
    else {
      const curpass = form.value.cupassword;
      const newpass = form.value.newpassword;
      const confirmpass = form.value.confirmpass;
      if (newpass === confirmpass) {
        const data = { email: email, curpass: curpass, newpass: newpass };
        this.http.post('http://localhost:8080/user/resetpass', data)
          .subscribe(res => {
            const state = res.json().state;
            const message = res.json().message;
            if (state === 1) {
              this.alerts.setMessage(message, 'success');
              localStorage.removeItem('email');
              const self = this;
              setTimeout(function () {
                self.router.navigate(['/home']);
              }, 1000);
            } else {
              this.alerts.setMessage(message, 'error');
            }
          });
      }
      else {
        this.alerts.setMessage('New Password does not March!', 'error');
      }
    }
  }
    // this.router.navigateByUrl('/');

}
