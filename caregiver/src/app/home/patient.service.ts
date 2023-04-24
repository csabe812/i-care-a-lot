import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { Patient } from './patient.model';
import { PatientHours } from './patient-hours.model';

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
    return this.http.post('https://caregiver-3c9dd-default-rtdb.europe-west1.firebasedatabase.app/patients.json', { name: patientName, id: null }).pipe(tap(resData => { console.log(resData) }));
  }

  fetchPatients() {
    return this.http.get<{ [key: string]: PatientData }>('https://caregiver-3c9dd-default-rtdb.europe-west1.firebasedatabase.app/patients.json')
    .pipe(map(resData => {
      const patients = [];
      for(const key in resData) {
        if(resData.hasOwnProperty(key)) {
          console.log(resData[key]);
          console.log(resData[key].name);
          patients.push(new Patient(key, resData[key].name))
        }
      }
      return patients;
    }));
  }

  saveHour(patientId: string, hours: number, date: Date) {
    return this.http.post('https://caregiver-3c9dd-default-rtdb.europe-west1.firebasedatabase.app/patient-hours.json', { patientId, hours, date, id: null }).pipe(tap(resData => { console.log(resData) }));
  }

  fetchHours() {
    return this.http.get<{ [key: string]: PatientHoursData }>('https://caregiver-3c9dd-default-rtdb.europe-west1.firebasedatabase.app/patient-hours.json')
    .pipe(map(resData => {
      const patientHours = [];
      for(const key in resData) {
        if(resData.hasOwnProperty(key)) {
          patientHours.push(new PatientHours(key, resData[key].date, resData[key].hours, resData[key].patientId))
        }
      }
      return patientHours;
    }));
  }

  deletePatient(id:string) {
    return this.http.delete(`https://caregiver-3c9dd-default-rtdb.europe-west1.firebasedatabase.app/patients/${id}.json`);
  } 

  updatePatient(id: string, newName: string) {
    return this.http.patch(`https://caregiver-3c9dd-default-rtdb.europe-west1.firebasedatabase.app/patients/${id}.json`, {
      name: newName
    });
  }

}
