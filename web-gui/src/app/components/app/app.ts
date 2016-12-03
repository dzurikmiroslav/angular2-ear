import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User, AuthService } from '../../services/auth';


@Component({
    selector: 'app',
    templateUrl: 'app.html',
    styleUrls: ['app.css']
})
export class AppComponent {

    isAuthorized: boolean = false;
    
    navbarOpen: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
        authService.getUser().subscribe((user: User) => {
            this.isAuthorized = !!user;
        });

        authService.loggedIn.subscribe((user: User) => {
            this.isAuthorized = true;
            this.router.navigateByUrl('/dashboard');
        });

        authService.loggedOut.subscribe(() => {
            this.isAuthorized = false;
            this.router.navigateByUrl('/login');
        });
    }

    logout(): void {
        this.authService.logout().subscribe();
    }
}