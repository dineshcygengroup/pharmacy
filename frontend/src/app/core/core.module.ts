import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import { NgxPrintModule } from 'ngx-print';

import { CoreRoutingModule } from './core-routing.module';
import { HttpService } from './services/http.service';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        HttpClientModule,
        HttpClientXsrfModule,
        // NgxPrintModule
    ],
    providers: [
        HttpService,
        CookieService
    ]
})
export class CoreModule { }
