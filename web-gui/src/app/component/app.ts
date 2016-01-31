import {Component} from 'angular2/core';
import {NgIf} from 'angular2/common'
import {Http, Headers} from 'angular2/http';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {User, AuthService} from '../service/auth';
import {DashboardComponent} from './dashboard';
import {LoginComponent} from './login';
import {AboutComponent} from './about';

const ROUTE_CONFIG_AUTHORIZED = [
  { path: '/', redirectTo: ['/Dashboard'] },
  { path: '/dashboard', component: DashboardComponent, as: 'Dashboard' },
  { path: '/about', component: AboutComponent, as: 'About' },
  { path: '/login', component: LoginComponent, as: 'Login' }
];

const ROUTE_CONFIG_UNAUTHORIZED = [
  { path: '/', redirectTo: ['/Login'] },
  { path: '/login', component: LoginComponent, as: 'Login' },
];

@Component({
  selector: 'app',
  template: `
    <div>
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" [routerLink]="['/']">EAR</a>
            </div>
            <div *ngIf="isAuthorized" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li>
                  <a [routerLink]="['Dashboard']">Dashboard</a>
                </li>
                <li>
                  <a [routerLink]="['About']">About</a>
                </li>
              </ul>
              <button class="btn btn-danger navbar-btn navbar-right" [click]="logout()">
                Log out <i class="glyphicon glyphicon-log-out"></i>
              </button>
            </div>
        </div>
      </nav>
      <div class="container">
        <router-outlet></router-outlet>
        <p>authorizes: {{isAuthorized}} </p>
      </div>
    </div>
  `,
  styles: [
    '.nav .router-link-active { color: #fff; background-color: #080808; }'
  ],
  directives: [RouterOutlet, RouterLink, NgIf]
})
//@RouteConfig(ROUTE_CONFIG_AUTHORIZED)
export class AppComponent {
  isAuthorized: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    authService.getUser().then(user => {
      this.isAuthorized = true;
      router.config(ROUTE_CONFIG_AUTHORIZED);
      //router.parent.navigateByUrl('/dashboard');
    }, err => {
        this.isAuthorized = false;
        router.config(ROUTE_CONFIG_UNAUTHORIZED);
        //router.parent.navigateByUrl('/login');
      });
  }

  logout() {
    this.authService.logout().then(() => {
      this.isAuthorized = false;
    });
  }
}
