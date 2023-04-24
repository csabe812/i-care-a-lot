import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddPatientPage implements OnInit {

  patientName: string;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  savePatient() {
    console.log(this.patientName);
    this.patientService.savePatient(this.patientName);
  }

}
