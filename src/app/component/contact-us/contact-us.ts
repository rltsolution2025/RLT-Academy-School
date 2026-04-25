import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {

  // ✅ Strongly typed form
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

  constructor(private fb: FormBuilder) {

    this.contactForm = this.fb.group({
      name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),

      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email
      ]),

      phone: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]),

      grade: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(/^(Kindergarten|Grade [1-9]|Grade 10|Grade 11|Grade 12)$/)
      ]),

      message: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }

  // Getter
  get f() {
    return this.contactForm.controls;
  }

  // Submit
  onSubmit() {
    this.submitted = true;
    this.successMessage = '';

    // Mark all fields touched (IMPORTANT for error display)
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = this.contactForm.getRawValue();
    console.log('Submitted Data:', formData);

    setTimeout(() => {
      this.loading = false;
      this.successMessage = 'Your message has been sent successfully!';
      this.contactForm.reset();
      this.submitted = false;
    }, 2000);
  }

  // Reset
  resetForm() {
    this.contactForm.reset();
    this.submitted = false;
    this.successMessage = '';
  }
}