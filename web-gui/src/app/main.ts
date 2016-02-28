import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser'
import {HTTP_BINDINGS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './component/app';
import {AuthService} from './service/auth';

bootstrap(AppComponent, [
  HTTP_BINDINGS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  AuthService
]);
