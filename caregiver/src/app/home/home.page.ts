import { Component, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientService } from './patient.service';
import { HttpClientModule } from '@angular/common/http';
import { Patient } from './patient.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [ PatientService ]
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";

  patients: Patient[] = [];

  constructor(private patientService: PatientService) {

  }

  ionViewDidEnter() {
    this.patientService.fetchPatients().subscribe(patients => {
      this.patients = patients;
    })
  }

}
