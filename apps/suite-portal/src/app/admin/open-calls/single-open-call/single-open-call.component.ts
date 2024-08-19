import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';


@Component({
  selector: 'single-open-call',
  templateUrl: './single-open-call.component.html',
})
export class SingleOpenCallComponent {
  @Input('request') call!: MaintenanceRequest;
  @Output('close') close = new EventEmitter<boolean>();

  getEntries() {
    return Object.entries(this.call || {})
      .filter(entrie => entrie[1])
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1')
        .trim()
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return  word.toUpperCase();
        });
        return [label, value];
      });
  }

  onClick() {
    this.close.emit(true);
  }
}
