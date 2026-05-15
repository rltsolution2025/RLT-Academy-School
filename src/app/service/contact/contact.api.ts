import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ContactApi {
  constructor(private http: HttpClient) {}

  //Backend API URL
  private apiUrl = 'http://localhost:5000/api/contacts';

  submitContact(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // GET CONTACTS
  getContacts(): Observable<any> {
    return this.http.get(`${this.apiUrl}?t=${Date.now()}`);
  }
}
