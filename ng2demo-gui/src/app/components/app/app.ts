import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserResponse, AuthService} from '../../services/services';

@Component({
    selector: 'app',
    templateUrl: 'app.html',
    styleUrls: ['app.css']
})
export class AppComponent {
    public isAuthorized: boolean = false;
    constructor(private router: Router, private authService: AuthService) {
        this.authService.getUser().subscribe((user: UserResponse) => {
            this.isAuthorized = !!user;
        });
    }
    logout(): void {
        this.authService.logout().subscribe();
        this.isAuthorized = false;
        this.router.navigate(['login']);
    }
}