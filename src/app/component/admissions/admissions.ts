import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admissions',
  imports: [CommonModule, FormsModule],
  templateUrl: './admissions.html',
  styleUrl: './admissions.css',
})
export class Admissions {
  success = false;

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
  submitForm(form: any) {

    this.success = false;

    if (form.invalid) return;

    // ✅ CREATE COPY (VERY IMPORTANT)
    const data = { ...this.formData };

    console.log("Form Data:", data);

    // ✅ SHOW SUCCESS
    this.success = true;

    // ✅ RESET FORM PROPERLY
    form.resetForm();

    // ✅ RESET OBJECT MANUALLY (BEST PRACTICE)
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
      this.success = false;
    }, 3000);
  }
}
