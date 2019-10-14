import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports:[
    DatatableComponent
  ]
})
export class CustomComponentsModule { }
