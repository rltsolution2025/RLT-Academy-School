import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AdmissionApi {
  private apiUrl = 'http://localhost:5000/api/admissions';

  constructor(private http: HttpClient) {}

  submitAdmission(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // GET ADMISSIONS
  getAdmissions(): Observable<any> {
    return this.http.get(`${this.apiUrl}?t=${Date.now()}`);
  }
}
