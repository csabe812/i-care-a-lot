import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-monthly-data-by-patient',
  templateUrl: './monthly-data-by-patient.page.html',
  styleUrls: ['./monthly-data-by-patient.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ PatientService ]
})
export class MonthlyDataByPatientPage implements OnInit {
  patientId: string = "";
  patientName: string = "";
  patientHours: any[] = [];
  toolbarText = new Date().getFullYear() + "." + ((+new Date().getMonth())+1) + ". hó";

  constructor(private patientService: PatientService, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.patientId = ""+this.route.snapshot.paramMap.get('id');
    this.patientService.getPatientById(this.patientId).subscribe(resp => {
      this.patientName = resp.name;
      //this.patientName = resp.name;
    });
    this.patientService.fetchHours().subscribe(data => {
      const monthNow= new Date().getMonth();
      this.patientHours = data.filter(f => f.patientId === this.patientId && new Date(f.date).getMonth() === monthNow)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());;
    })
  }

  async deleteHour(id: string) {
    const alert = await this.alertController.create({
      header: 'Biztosan törölni szeretné?',
      buttons: [
        {
          text: 'Mégsem',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteHourFromDb(id);
          },
        },
      ],
    });

    await alert.present();

  }

  deleteHourFromDb(id: string) {
    this.patientService.deleteHourById(id).subscribe();
    this.patientHours = this.patientHours.filter(f => f.id !== id);
  }

}
