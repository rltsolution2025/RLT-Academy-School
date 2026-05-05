import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-laborartories',
  imports: [RouterLink, CommonModule],
  templateUrl: './laborartories.html',
  styleUrl: './laborartories.css',
})
export class Laborartories implements AfterViewInit {
  ngAfterViewInit() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
}
