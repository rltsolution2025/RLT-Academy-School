import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { AdminApi } from '../../service/admin/admin.api';

@Component({
  selector: 'app-admin-login',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './admin-login.html',

  styleUrl: './admin-login.css',
})
export class AdminLogin {
  // ======================================================
  // FORM DATA
  // ======================================================

  formData = {
    username: '',
    password: '',
  };

  // ======================================================
  // STATES
  // ======================================================

  loading = false;

  errorMessage = '';

  successMessage = '';

  // ======================================================
  // CONSTRUCTOR
  // ======================================================

  constructor(
    private adminApi: AdminApi,

    private router: Router,
  ) {}

  // ======================================================
  // CLEAR ALERTS
  // ======================================================

  clearMessages() {
    this.errorMessage = '';

    this.successMessage = '';
  }

  // ======================================================
  // LOGIN
  // ======================================================
  login(form: NgForm) {
    // RESET

    this.errorMessage = '';

    this.successMessage = '';

    // VALIDATION

    if (form.invalid) {
      form.control.markAllAsTouched();

      return;
    }

    // START LOADING

    this.loading = true;

    // API CALL

    this.adminApi.login(this.formData).subscribe({
      // SUCCESS

      next: (response: any) => {
        // STOP LOADING

        this.loading = false;

        // SUCCESS MESSAGE

        this.successMessage = response.message;

        // SAVE SESSION

        sessionStorage.setItem('adminUser', response.admin.username);

        // REDIRECT

        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 1000);
      },

      // ERROR

      error: (error: any) => {
        // STOP LOADING

        this.loading = false;

        console.log('LOGIN ERROR:', error);

        // SHOW BACKEND MESSAGE

        if (error.status === 401) {
          this.errorMessage = error.error.message;
        } else if (error.status === 400) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Server Error';
        }
      },
    });
  }
}
