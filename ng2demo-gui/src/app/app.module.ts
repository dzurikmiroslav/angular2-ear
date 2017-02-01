import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AppComponent} from './components/app';
import {DashboardComponent} from './components/dashboard';
import {LoginComponent} from './components/login';
import {AboutComponent} from './components/about';
import {AppRoutingModule} from './app-routing.module';
import {SERVICE_PROVIDERS} from './services/services';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        AboutComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        SERVICE_PROVIDERS
    ]
})
export class AppModule {
}
