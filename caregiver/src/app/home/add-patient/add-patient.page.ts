import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientService } from '../patient.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [PatientService]
})
export class AddPatientPage implements OnInit {

  patientName: string;

  constructor(private patientService: PatientService, private location: Location) { }

  ngOnInit() {
  }

  savePatient() {
    this.patientService.savePatient(this.patientName).subscribe(resp => {
      this.location.back();
    });
  }

}
