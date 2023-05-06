import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicModule, IonModal } from '@ionic/angular';
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
  providers: [PatientService]
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";

  patients: Patient[] = [];

  constructor(private patientService: PatientService, private alertController: AlertController) {

  }

  ionViewDidEnter() {
    this.patientService.fetchPatients().subscribe(patients => {
      this.patients = patients.sort((a, b) => a.name.localeCompare(b.name));
    })
  }

  async deletePatient(id: string, name: string) {
    const alert = await this.alertController.create({
      header: `Biztosan törölni szeretné ${name}-t?`,
      buttons: [
        {
          text: 'Mégsem',
          role: 'cancel',
          handler: () => { console.log("Mégsem") },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deletePatientFromDb(id);
          },
        },
      ],
    });

    await alert.present();
  }

  deletePatientFromDb(id: string) {
    this.patientService.deletePatient(id).subscribe();
    this.patients = this.patients.filter(f => f.id !== id);
  }

  async editPatient(patient: Patient, slidingItem: any) {
    const alert = await this.alertController.create({
      header: `Adja meg ${patient.name} új nevét`,
      buttons: [{
        text: 'Ok',
        handler: (data) => {
          this.modifyPatient(patient.id, data[0]);
          slidingItem.close();
        }
      }],
      inputs: [
        {
          placeholder: 'Name',
        }
      ],
    });

    await alert.present();
  }

  modifyPatient(id: string, newName: string) {
    this.patientService.updatePatient(id, newName).subscribe();
    let patient =  this.patients.find(f => f.id === id);
    if(patient) {
      patient.name = newName;
    }
  }

}
