import { AfterViewInit, Component } from '@angular/core';

import * as AOS from 'aos';

@Component({
  selector: 'app-facilities',
  imports: [],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class Facilities implements AfterViewInit {
  ngAfterViewInit(): void {

    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true
      });
    }

  }
}
