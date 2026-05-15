import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactTable } from '../contact-table/contact-table';
import { AdmissionTable } from '../admission-table/admission-table';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, ContactTable, AdmissionTable ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  selectedMenu = 'contacts';

  adminName = localStorage.getItem('adminUser');

  logout(){
    localStorage.removeItem('adminUser');

    window.location.href = '/admin/login';
  }

}
