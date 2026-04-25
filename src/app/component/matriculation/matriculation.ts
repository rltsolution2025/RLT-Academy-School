import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Syllabus {
  description: string;
  subjects: string[];
  pdf: string;
}

@Component({
  selector: 'app-matriculation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matriculation.html',
  styleUrl: './matriculation.css',
})
export class Matriculation {

  grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

  selectedGrade = 'Grade 1';

  showModal = false;
  pdfUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  syllabusData: Record<string, Syllabus> = {
    'Grade 1': {
      description: 'Basic reading, writing, numeracy and EVS through activity-based learning.',
      subjects: ['English', 'Tamil', 'Mathematics', 'EVS', 'General Knowledge'],
      pdf: 'assets/pdf/grade1.pdf'
    },
    'Grade 2': {
      description: 'Strengthening foundational skills with language and mathematics.',
      subjects: ['English', 'Tamil', 'Mathematics', 'EVS', 'General Knowledge'],
      pdf: 'assets/pdf/grade2.pdf'
    },
    'Grade 3': {
      description: 'Structured learning with introduction to computers.',
      subjects: ['English', 'Tamil', 'Mathematics', 'EVS', 'Computer Science'],
      pdf: 'assets/pdf/grade3.pdf'
    },
    'Grade 4': {
      description: 'Improved comprehension with practical exposure.',
      subjects: ['English', 'Tamil', 'Mathematics', 'EVS', 'Computer Science'],
      pdf: 'assets/pdf/grade4.pdf'
    },
    'Grade 5': {
      description: 'Introduction to Science and Social Science.',
      subjects: ['English', 'Tamil', 'Mathematics', 'Science', 'Social Science'],
      pdf: 'assets/pdf/grade5.pdf'
    },
    'Grade 6': {
      description: 'Advanced learning with analytical thinking.',
      subjects: ['English', 'Tamil', 'Mathematics', 'Science', 'Social Science'],
      pdf: 'assets/pdf/grade6.pdf'
    }
  };

  selectGrade(grade: string) {
    this.selectedGrade = grade;
  }

  openPdf(url: string) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}