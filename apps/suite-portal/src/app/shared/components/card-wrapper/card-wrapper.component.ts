import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'card-wrapper',
  templateUrl: './card-wrapper.component.html',
})
export class CardWrapperComponent {
  @Input('label') label!: string;
}
