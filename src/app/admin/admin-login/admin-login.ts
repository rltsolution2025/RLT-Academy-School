import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  formData = {
    username: '',
    password: '',
  };

  errorMessage = '';

  constructor(private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) return;

    // Static Login

    if (this.formData.username === 'RLT_Admin' && this.formData.password === 'RLT@2026') {
      localStorage.setItem('adminToken', 'Admin');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
