/**
 * Generated stuff...
 */
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
/**
 * Configuration stuff.
 */
@Injectable()
export class ServiceConfig {
    public rootUrl: string = 'localhost:8080';
    public request: EventEmitter<Request> = new EventEmitter<Request>();
    public response: EventEmitter<Response> = new EventEmitter<Response>();
}
/**
 * Request and response types and enumerations.
 */
export interface LoginRequest {
    username: string;
    password: string;
}
export interface UserResponse {
    login: string;
    roles: Role[];
}
export interface LoginResponse {
    success: boolean;
}
export enum Role {
    BASIC, ADMIN
}
/**
 * Services stuff.
 */
@Injectable()
export class AuthService {
    constructor(private _http: Http, private _serviceConfig: ServiceConfig) {
    }
    public login(_request: LoginRequest): Observable<LoginResponse> {
        let _headers: Headers = new Headers();
        _headers.append('Accept', 'application/json');
        _headers.append('Content-Type', 'application/json');
        let _reqOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this._serviceConfig.rootUrl + '/auth/login',
            body: JSON.stringify(_request),
            headers: _headers
        });
        let _req: Request = new Request(_reqOptions);
        this._serviceConfig.request.emit(_req);
        return this._http.request(_req).map((_res: Response) => {
            this._serviceConfig.response.emit(_res);
            return _res.text() ? _res.json() as LoginResponse : null;
        });
    }
    public getUser(): Observable<UserResponse> {
        let _headers: Headers = new Headers();
        _headers.append('Accept', '*/*');
        _headers.append('Content-Type', 'application/json');
        let _reqOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this._serviceConfig.rootUrl + '/auth/user',
            headers: _headers
        });
        let _req: Request = new Request(_reqOptions);
        this._serviceConfig.request.emit(_req);
        return this._http.request(_req).map((_res: Response) => {
            this._serviceConfig.response.emit(_res);
            return _res.text() ? _res.json() as UserResponse : null;
        });
    }
    public logout(): Observable<void> {
        let _headers: Headers = new Headers();
        _headers.append('Accept', '*/*');
        _headers.append('Content-Type', '*/*');
        let _reqOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this._serviceConfig.rootUrl + '/auth/logout',
            headers: _headers
        });
        let _req: Request = new Request(_reqOptions);
        this._serviceConfig.request.emit(_req);
        return this._http.request(_req).map((_res: Response) => {
            this._serviceConfig.response.emit(_res);
        });
    }
}
@Injectable()
export class StuffService {
    constructor(private _http: Http, private _serviceConfig: ServiceConfig) {
    }
    public b(arg0: string, arg1: number, arg2: string): Observable<string> {
        let _headers: Headers = new Headers();
        _headers.append('Accept', '*/*');
        _headers.append('Content-Type', 'text/plain');
        let _reqOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this._serviceConfig.rootUrl + substitudeUrl('/stuff/method2/{arg0}/{arg1}', { arg0, arg1 }),
            search: encodeParams({ arg2 }),
            headers: _headers
        });
        let _req: Request = new Request(_reqOptions);
        this._serviceConfig.request.emit(_req);
        return this._http.request(_req).map((_res: Response) => {
            this._serviceConfig.response.emit(_res);
            return _res.text();
        });
    }
    public getText(str: string): Observable<string> {
        let _headers: Headers = new Headers();
        _headers.append('Accept', '*/*');
        _headers.append('Content-Type', 'text/plain');
        let _reqOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Get,
            url: this._serviceConfig.rootUrl + '/stuff/',
            search: encodeParams({ str }),
            headers: _headers
        });
        let _req: Request = new Request(_reqOptions);
        this._serviceConfig.request.emit(_req);
        return this._http.request(_req).map((_res: Response) => {
            this._serviceConfig.response.emit(_res);
            return _res.text();
        });
    }
    public a(str: string, num: number): Observable<string> {
        let _headers: Headers = new Headers();
        _headers.append('Accept', '*/*');
        _headers.append('Content-Type', 'text/plain');
        let _reqOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this._serviceConfig.rootUrl + '/stuff/method1',
            search: encodeParams({ str, num }),
            headers: _headers
        });
        let _req: Request = new Request(_reqOptions);
        this._serviceConfig.request.emit(_req);
        return this._http.request(_req).map((_res: Response) => {
            this._serviceConfig.response.emit(_res);
            return _res.text();
        });
    }
}
/**
 * Providers for using services.
 */
export const SERVICE_PROVIDERS: any[] = [ServiceConfig, AuthService, StuffService];
/**
 * Some private methods.
 */
function substitudeUrl(url: string, values: Object): string {
    Object.keys(values).map(key => {
        url = url.replace('{' + encodeURIComponent(key) + '}', encodeURIComponent(values[key]));
    });
    return url;
}
function encodeParams(values: Object): string {
    return Object.keys(values).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
    }).join('&');
}
