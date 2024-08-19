import { Component, OnInit } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceService } from '../../shared/services/maintenance.service';
import { LoginService } from '../../shared/services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'pm-open-calls',
  templateUrl: './open-calls.component.html',
})
export class OpenCallsComponent {

  openCalls$: Observable<MaintenanceRequest[]>;
  openCalls: MaintenanceRequest[] = [];
  constructor(
    private maintenanceService: MaintenanceService,
    private loginService: LoginService
  ) {
    this.openCalls$ = maintenanceService.getOpenMaintenanceCalls();
  }

  logout(){
    this.loginService.logout();
  }

  loadCalls() {
    this.openCalls = [];
    this.maintenanceService.getOpenMaintenanceCalls();
  }

  closeCall(id: string) {
    this.maintenanceService.closeMaintenanceCalls(id);
  }

}
