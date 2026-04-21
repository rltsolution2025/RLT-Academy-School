import { AfterViewInit, Component } from '@angular/core';

declare var AOS: any;

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
