import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { ContactApi } from '../../service/contact/contact.api';

@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-table.html',
  styleUrl: './contact-table.css',
})
export class ContactTable implements OnInit {
  contacts: any[] = [];

  loading = true;

  constructor(private contactApi: ContactApi) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactApi.getContacts().subscribe({
      next: (response: any) => {
        console.log('CONTACT RESPONSE:', response);

        this.contacts = response.data || [];

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
    const exportData = this.contacts.map((item, index) => ({
      'S.No': index + 1,
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      Grade: item.grade,
      Message: item.message,
      CreatedAt: item.createdAt,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    const workbook: XLSX.WorkBook = {
      Sheets: { Contacts: worksheet },
      SheetNames: ['Contacts'],
    };

    XLSX.writeFile(workbook, 'Contact_Form_Data.xlsx');
  }
}
