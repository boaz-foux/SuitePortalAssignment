import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenCallsComponent } from './open-calls/open-calls.component';
import { LoginComponent } from './login/login.component';
import { OpenCallsModule } from './open-calls/open-calls.module';
import { LoginModule } from './login/login.module';
import { AdminGuard } from './admin.guard';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: "admin",
    redirectTo: "open-calls",
  },
  {
    path: "open-calls",
    canActivate: [AdminGuard],
    component: OpenCallsComponent,
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  exports: [
    RouterModule,
  ],
  providers: [AdminGuard],
  imports: [
    SharedModule,
    OpenCallsModule,
    LoginModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminRoutingModule { }