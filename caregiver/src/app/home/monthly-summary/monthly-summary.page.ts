import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientService } from '../patient.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.page.html',
  styleUrls: ['./monthly-summary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ PatientService ]
})
export class MonthlySummaryPage implements OnInit {

  patientHoursData: any[] = [];
  data: any[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.patientService.fetchPatients().subscribe(patients => {
      this.patientService.fetchHours().subscribe(patientHours => {
        for(let i of patientHours) {
          const patientName = patients.find(f => i.patientId === f.id)?.name;
          this.patientHoursData.push({...i, patientName});
        }

        for(let i of this.patientHoursData) {
          const pati = this.data.find(f => f.name === i.patientName);
          if(pati == null) {
            const name = i.patientName;
            const date = i.date;
            this.data.push({name, hours: 0, date});
          }
        }

        for(let i of this.patientHoursData) {
          const patient = this.data.find(f => f.name === i.patientName);
          if(new Date(i.date).getMonth() === new Date().getMonth()) {
            patient.hours += +i.hours;
          }
        }

      });
    })
  }

}
