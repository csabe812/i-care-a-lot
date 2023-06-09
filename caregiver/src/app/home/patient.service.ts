import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { Patient } from './patient.model';
import { PatientHours } from './patient-hours.model';
import { environment } from 'src/environments/environment';

interface PatientData {
  name: string;
}

interface PatientHoursData {
  date: Date;
  hours: number;
  patientId: string;
}

@Injectable()
export class PatientService {

  constructor(private http: HttpClient) { }

  savePatient(patientName: string) {
    return this.http.post(`${environment.FIREBASE_DB_URL}patients.json`, { name: patientName, id: null }).pipe(tap(resData => { console.log(resData) }));
  }

  fetchPatients() {
    return this.http.get<{ [key: string]: PatientData }>(`${environment.FIREBASE_DB_URL}patients.json`)
      .pipe(map(resData => {
        const patients = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            patients.push(new Patient(key, resData[key].name))
          }
        }
        return patients;
      }));
  }

  saveHour(patientId: string, hours: number, date: Date) {
    return this.http.post(`${environment.FIREBASE_DB_URL}patient-hours.json`, { patientId, hours, date, id: null }).pipe(tap(resData => { console.log(resData) }));
  }

  fetchHours() {
    return this.http.get<{ [key: string]: PatientHoursData }>(`${environment.FIREBASE_DB_URL}patient-hours.json`)
      .pipe(map(resData => {
        const patientHours = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            patientHours.push(new PatientHours(key, resData[key].date, resData[key].hours, resData[key].patientId))
          }
        }
        return patientHours;
      }));
  }

  deletePatient(id: string) {
    return this.http.delete(`${environment.FIREBASE_DB_URL}patients/${id}.json`);
  }

  updatePatient(id: string, newName: string) {
    return this.http.patch(`${environment.FIREBASE_DB_URL}patients/${id}.json`, {
      name: newName
    });
  }

  getPatientById(id: string) {
    return this.http.get<PatientData>(`${environment.FIREBASE_DB_URL}patients/${id}.json`);
  }

  deleteHourById(id: string) {
    return this.http.delete(`${environment.FIREBASE_DB_URL}patient-hours/${id}.json`);
  }

}
