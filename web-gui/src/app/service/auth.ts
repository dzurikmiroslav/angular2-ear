import {Injectable} from 'angular2/core'
import {Http, Headers, RequestOptions, Response} from 'angular2/http';

export interface User {
  login: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  private options: RequestOptions;

  private user: User;

  constructor(private http: Http) {
    let headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions();
    this.options.headers = headers;
  }

  public getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.user) {
        resolve(this.user);
      } else {
        this.http.get('/web-service/rest/auth/user').subscribe(res => {
          this.user = res.json();
          resolve(this.user);
        }, err => {
            reject();
          });
      }
    });
  }

  public login(username: string, password: string): Promise<void> {
    let body = JSON.stringify({ username, password });
    return new Promise<void>((resolve, reject) => {
      this.http.post('/web-service/rest/auth/login', body, this.options).subscribe(res => {
        this.user = res.json();
        resolve();
      }, err => {
          reject();
        });
    });
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post('/web-service/rest/auth/logout', null, this.options).subscribe(res => {
        resolve();
      }, err => {
          reject();
        });
    });
  }
}