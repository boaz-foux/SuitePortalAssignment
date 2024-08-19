import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenCallsComponent } from './open-calls.component';
import { SingleOpenCallComponent } from './single-open-call/single-open-call.component'
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
  ],
  declarations: [
    OpenCallsComponent,
    SingleOpenCallComponent,
  ],
  exports: [OpenCallsComponent]
})
export class OpenCallsModule { }
