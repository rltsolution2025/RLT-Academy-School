import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { AdmissionApi } from '../../service/admission/admission.api';

@Component({
  selector: 'app-admission-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admission-table.html',
  styleUrl: './admission-table.css',
})
export class AdmissionTable implements OnInit {
  admissions: any[] = [];

  loading = true;

  constructor(private admissionApi: AdmissionApi) {}

  ngOnInit(): void {
    this.loadAdmissions();
  }

  loadAdmissions() {
    this.admissionApi.getAdmissions().subscribe({
      next: (response: any) => {
        console.log('ADMISSION RESPONSE:', response);

        this.admissions = response.data || [];

        this.loading = false;
      },

      error: (error: any) => {
        console.error(error);

        this.loading = false;
      },
    });
  }

  // =========================================
  // EXPORT EXCEL
  // =========================================

  exportExcel(): void {
    const exportData = this.admissions.map((item, index) => ({
      'S.No': index + 1,
      StudentName: item.studentName,
      Class: item.class,
      DOB: item.dob,
      Gender: item.gender,
      ParentName: item.parentName,
      Phone: item.phone,
      Email: item.email,
      Address: item.address,
      CreatedAt: item.createdAt,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    const workbook: XLSX.WorkBook = {
      Sheets: { Admissions: worksheet },
      SheetNames: ['Admissions'],
    };

    XLSX.writeFile(workbook, 'Admission_Form_Data.xlsx');
  }
}
