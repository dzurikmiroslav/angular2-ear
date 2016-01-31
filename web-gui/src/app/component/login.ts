import { Component } from 'angular2/core';
import { FormBuilder, Form, Validators, ControlGroup} from 'angular2/common'
import {User, AuthService} from '../service/auth';

@Component({
  selector: 'login',
  template: `
    <div>
      <form [ngFormModel]="loginForm" (submit)="doLogin($event)">
        <h2>Please sign in</h2>
        <div class="form-group">
          <label for="username">Email address</label>
          <input id="username" type="text" ngControl="username" class="form-control"/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="text" ngControl="password" class="form-control"/>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
      user={{stuff}}
    </div>
  `
})
export class LoginComponent {
  public stuff: string;
  private loginForm: ControlGroup;
  constructor(private authService: AuthService, fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    authService.getUser().then(user => {
      this.stuff = JSON.stringify(user);
    });

    //this.stuff = JSON.stringify(authService.getUser().);
  }
  doLogin(event) {
    event.preventDefault();
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).then(() => {
      console.log('login ok');
    }, err => {
        console.log('login err');
      });
  }
}
