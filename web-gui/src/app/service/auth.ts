import {Injectable, EventEmitter} from 'angular2/core'
import {Http, Headers, RequestOptions, Response} from 'angular2/http';

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
  public getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.user) {
        resolve(this.user);
      } else {
        this.http.post('/web-service/rest/auth/user').subscribe(res => {
          this.user = res.text() ? res.json() : null;
          resolve(this.user);
        }, err => {
            reject();
          });
      }
    });
  }

  public login(username: string, password: string): Promise<boolean> {
    let body = JSON.stringify({ username, password });
    return new Promise<boolean>((resolve, reject) => {
      this.http.post('/web-service/rest/auth/login', body, this.options).subscribe(res => {
        if (res.text()) {
          var status = res.json();
          if (status.success) {
            this.getUser().then((user) => {
              this.loggedIn.next(user);
            });
          }
          resolve(status.success);
        }
      }, err => {
          reject();
        });
    });
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post('/web-service/rest/auth/logout', null, this.options).subscribe(res => {
        this.loggedOut.next(null);
        resolve();
      }, err => {
          reject();
        });
    });
  }
}
