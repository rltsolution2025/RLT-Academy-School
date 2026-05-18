import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-smart-classes',
  imports: [CommonModule, RouterLink],
  templateUrl: './smart-classes.html',
  styleUrl: './smart-classes.css',
})
export class SmartClasses {}
