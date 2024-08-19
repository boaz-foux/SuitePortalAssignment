import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
