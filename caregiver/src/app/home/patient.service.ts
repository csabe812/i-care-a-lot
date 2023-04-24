import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  savePatient(patientName: string) {
    this.http.post('https://caregiver-3c9dd-default-rtdb.europe-west1.firebasedatabase.app/patients.json', { patientName, id: null }).pipe(tap(resData => { console.log(resData) }));

  }
}
