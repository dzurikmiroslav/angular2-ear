import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

export interface User {
    login: string;
    roles: string[];
}

@Injectable()
export class AuthService {

    private options: RequestOptions;

    private user: User;

    public loggedIn: EventEmitter<User> = new EventEmitter<User>();

    public loggedOut: EventEmitter<void> = new EventEmitter<void>();

    constructor(private http: Http) {
        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions();
        this.options.headers = headers;
    }

    /**
     * @deprecated Find som more cool way
     */
    public getUser(): Observable<User> {
        if (this.user) {
            return Observable.of<User>(this.user);
        } else {
            return this.http.post('/web-service/rest/auth/user', null, this.options)
                .map((res: Response) => this.user = res.text() ? res.json() as User : null);
        }
    }

    public login(username: string, password: string): Observable<boolean> {
        return this.http.post('/web-service/rest/auth/login', JSON.stringify({ username, password }), this.options)
            .map((res: Response) => {
                if (res.text() && res.json().success) {
                    this.getUser().subscribe((user: User) => {
                        this.loggedIn.next(user);
                    });
                    return true;
                } else {
                    return false;
                }
            });
    }

    public logout(): Observable<void> {
        return this.http.post('/web-service/rest/auth/logout', null, this.options)
            .map(() => {
                this.loggedOut.next(null);
            });
    }
}
