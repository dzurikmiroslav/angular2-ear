import {Component} from 'angular2/core';
import {NgIf, NgClass} from 'angular2/common'
import {Http, Headers} from 'angular2/http';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {User, AuthService} from '../service/auth';
import {DashboardComponent} from './dashboard';
import {LoginComponent} from './login';
import {AboutComponent} from './about';

@Component({
  selector: 'app',
  template: `
    <div>
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button *ngIf="isAuthorized" type="button" class="navbar-toggle collapsed" (click)="navbarOpen = !navbarOpen">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">EAR</a>
          </div>
          <div *ngIf="isAuthorized" class="navbar-collapse collapse" [ngClass]="{in: navbarOpen}">
            <ul class="nav navbar-nav">
              <li>
                <a [routerLink]="['Dashboard']">Dashboard</a>
              </li>
              <li>
                <a [routerLink]="['About']">About</a>
              </li>
             </ul>
             <form class="navbar-form navbar-right">
             <button class="btn btn-danger" (click)="logout()">
                Log out <i class="glyphicon glyphicon-log-out"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    '.nav .router-link-active { color: #fff; background-color: #080808; }'
  ],
  directives: [RouterOutlet, RouterLink, NgIf, NgClass]
})
@RouteConfig([
  { path: '/login', component: LoginComponent, as: 'Login' },
  { path: '/dashboard', component: DashboardComponent, as: 'Dashboard' },
  { path: '/about', component: AboutComponent, as: 'About' }
])
export class AppComponent {
  isAuthorized: boolean = false;

  navbarOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    authService.getUser().then(user => {
      if (user) {
        this.isAuthorized = true;
        router.navigateByUrl('/dashboard');
      } else {
        this.isAuthorized = false;
        router.navigateByUrl('/login');
      }
    });

    authService.loggedIn.subscribe((user: User) => {
      this.isAuthorized = true;
      router.navigateByUrl('/dashboard');
    });

    authService.loggedOut.subscribe(() => {
      this.isAuthorized = false;
      router.navigateByUrl('/login');
    });
  }

  logout() {
    this.authService.logout();
  }
}
