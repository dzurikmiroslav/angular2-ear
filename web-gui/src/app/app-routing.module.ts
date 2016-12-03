import { NgModule, Injectable } from '@angular/core';
import { Router, RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { User, AuthService } from './services/auth';
import { DashboardComponent } from './components/dashboard';
import { LoginComponent } from './components/login';
import { AboutComponent } from './components/about';


@Injectable()
class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authService.getUser().map(
            (user: User) => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['login']);
                    return false;
                }
            });
    }
}

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [
        AuthGuard
    ]
})
export class AppRoutingModule {
}
