import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, LoginResponse} from '../../services/services';
import {AppComponent} from '../app';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    private model: any = {};
    private badLogin: boolean;
    constructor(private authService: AuthService, private router: Router, private appComponent: AppComponent) {
    }
    login() {
        this.authService.login(this.model)
            .subscribe((response: LoginResponse) => {
                if (response.success) {
                    this.badLogin = false;
                    this.appComponent.isAuthorized = true;
                    this.router.navigate(['dashboard']);
                } else {
                    this.badLogin = true;
                }
            });
    }
}