import {Component, ViewEncapsulation, OnInit} from '@angular/core';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'sv-app',
  providers: [],
  styles: [require('./app.component.scss')],
  template: require('./app.component.html'),
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
