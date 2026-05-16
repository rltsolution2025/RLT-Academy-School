import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-header.html',
  styleUrl: './mobile-header.css',
})
export class MobileHeader {}
