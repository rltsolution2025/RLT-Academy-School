import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-library',
  imports: [RouterLink, CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library implements AfterViewInit {
  ngAfterViewInit() {
      AOS.init({
        duration: 1000,
        once: true
      });
    }
}
