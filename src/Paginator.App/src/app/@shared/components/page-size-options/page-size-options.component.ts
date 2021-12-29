import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-size-options',
  templateUrl: './page-size-options.component.html',
  styleUrls: ['./page-size-options.component.scss']
})
export class PageSizeOptionsComponent {

  @Input() pageSizeOptions: string[] = [];

  @Output() pageSizeOptionClick: EventEmitter<string> = new EventEmitter();
}

@NgModule({
  declarations: [
    PageSizeOptionsComponent
  ],
  exports: [
    PageSizeOptionsComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class PageSizeOptionsModule { }
