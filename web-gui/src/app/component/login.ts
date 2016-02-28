import {Component} from 'angular2/core';
import {FormBuilder, Form, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common'
import {User, AuthService} from '../service/auth';

@Component({
  selector: 'login',
  template: `
    <div>
      <div class="jumbotron">
        <h2>Please sign in</h2>
        <form [ngFormModel]="loginForm" (submit)="doLogin()" class="form-horizontal">
          <div class="form-group">
            <label for="username" class="col-sm-2 control-label">Login</label>
            <div class="col-sm-10">
                <input id="username" type="text" ngControl="username" class="form-control"/>
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input id="password" type="text" ngControl="password" class="form-control"/>
            </div>
          </div>
          <button class="btn btn-primary" type="submit" [disabled]="!loginForm.valid">Sign in</button>
        </form>
      </div>
    </div>
  `,
  directives: [FORM_DIRECTIVES]
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
  }

  doLogin() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
