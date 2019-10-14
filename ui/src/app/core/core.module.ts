import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CookieService } from 'ngx-cookie-service';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { HostComponent } from './host/host.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { NotificationHandlerService } from './services/notification-handler.service';

@NgModule({
  declarations: [HeaderComponent, HostComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpClientXsrfModule,
    MaterialComponentsModule
  ],
  providers: [
    CookieService,
    NotificationHandlerService
  ],
  exports: [
    HeaderComponent,
    HostComponent
  ]
})
export class CoreModule { }
