import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AdmissionApi } from '../../service/admission/admission.api';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admissions.html',
  styleUrl: './admissions.css',
})
export class Admissions {
  constructor(private admissionApi: AdmissionApi) {}

  success = false;

  loading = false;

  showPopup = false;

  submittedName = '';

  classes: string[] = [
    'Pre-KG',
    'LKG',
    'UKG',
    ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`),
  ];

  formData = {
    studentName: '',
    class: '',
    dob: '',
    gender: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
  };

  submitForm(form: NgForm) {
    this.success = false;

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.loading = true;

    const data = { ...this.formData };

    this.admissionApi.submitAdmission(data).subscribe({
      next: (response) => {
        this.loading = false;

        this.submittedName = data.studentName;

        this.showPopup = true;

        form.resetForm();

        this.formData = {
          studentName: '',
          class: '',
          dob: '',
          gender: '',
          parentName: '',
          phone: '',
          email: '',
          address: '',
        };

        setTimeout(() => {
          this.showPopup = false;
        }, 4000);
      },

      error: (error) => {
        console.error('Admission Error:', error);

        this.loading = false;
      },
    });
  }

  closePopup() {
    this.showPopup = false;
  }
}
