import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { Toast } from 'primeng/toast';
import {QRCodeComponent, QRCodeModule} from 'angularx-qrcode/';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide:Toast,useClass: BrowserAnimationsModule},
    {provide:LocationStrategy,useClass: HashLocationStrategy},


    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    

  ],
});
