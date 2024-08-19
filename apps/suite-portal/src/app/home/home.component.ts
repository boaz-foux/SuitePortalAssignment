import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { MaintenanceService } from '../shared/services/maintenance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  serviceTypes = ALL_SERVICE_TYPES;

  maintanceCallForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      serviceType: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp(`^${this.serviceTypes.join('|')}$`)),
      ]),
      name: new FormControl('', [Validators.required]),
      unitNumber: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
      details: new FormControl(''),
    }
  );

  constructor(
    private maintenanceService: MaintenanceService,
    private snackBar: MatSnackBar,
  ) {
    //
  }

  onSubmit(formDirective: FormGroupDirective) {
    const { maintanceCallForm } = this;
    if (!maintanceCallForm.valid) {
      return;
    }
    this.maintenanceService
      .createMaintenanceCall(maintanceCallForm.value)
      .then(({id}) => {
        formDirective.resetForm();
        maintanceCallForm.reset();
        this.snackBar.open(`Maintenance call(id: ${id}) paged succesfully`, 'OK');
      })
      .catch(({error}) => {
        this.snackBar.open('Call cannot be created\n' + error.message.join('\n'), 'OK');
      })
      .catch(() => {
        this.snackBar.open('Unknown Error', 'OK');
      });

  }
}
