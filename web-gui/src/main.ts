import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, Provider } from '@angular/core';

import { AppModule } from './app/app.module';

var providers: Provider[];

if (process.env.ENV === 'production') {
    enableProdMode();
    providers = [
        { provide: APP_BASE_HREF, useValue: '/web-gui' }
    ];
}

platformBrowserDynamic(providers).bootstrapModule(AppModule);
