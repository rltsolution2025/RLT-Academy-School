import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { ContactApi } from '../../service/contact/contact.api';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {
  contactForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    grade: FormControl<string>;
    message: FormControl<string>;
  }>;

  submitted = false;

  loading = false;

  successMessage = '';

  // POPUP VARIABLES
  showPopup = false;

  submittedName = '';

  constructor(
    private fb: FormBuilder,
    private contactApi: ContactApi,
  ) {
    this.contactForm = this.fb.group({
      name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),

      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),

      phone: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),

      grade: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^(Kindergarten|Grade [1-9]|Grade 10|Grade 11|Grade 12)$/),
      ]),

      message: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(10)]),
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.successMessage = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = this.contactForm.getRawValue();

    this.contactApi.submitContact(formData).subscribe({
      next: (response) => {
        this.loading = false;

        // SAVE NAME
        this.submittedName = formData.name;

        // SHOW POPUP
        this.showPopup = true;

        this.contactForm.reset();

        this.submitted = false;

        // AUTO CLOSE AFTER 4 SECONDS
        setTimeout(() => {
          this.showPopup = false;
        }, 4000);
      },

      error: (error) => {
        console.error('Error submitting contact form:', error);

        this.loading = false;
      },
    });
  }

  closePopup() {
    this.showPopup = false;
  }

  resetForm() {
    this.contactForm.reset();

    this.submitted = false;

    this.successMessage = '';
  }
}
 