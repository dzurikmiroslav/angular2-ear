import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AppComponent } from './components/app';
import { DashboardComponent } from './components/dashboard';
import { LoginComponent } from './components/login';
import { AboutComponent } from './components/about';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        AboutComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthService
    ]
})
export class AppModule {
}
