import { Component } from '@angular/core';

import { AuthService } from '../../services/auth';


@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {

    private model: any = {};

    private badLogin: boolean;

    constructor(private authService: AuthService) {
    }

    login() {
        this.authService.login(this.model.username, this.model.password)
            .subscribe((success: boolean) => {
                this.badLogin = !success;
            });
    }
}