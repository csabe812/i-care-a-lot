import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.page.html',
  styleUrls: ['./add-hours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ PatientService ]
})
export class AddHoursPage implements OnInit {
  selectedDate: string = new Date().toISOString();
  patientId: string = "";
  selectedHours: number = 0;

  constructor(private patientService: PatientService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.patientId = ""+this.route.snapshot.paramMap.get('id');
    console.log(this.patientId);
  }

  saveHour() {
    this.patientService.saveHour(this.patientId, this.selectedHours, new Date(this.selectedDate)).subscribe();
    this.location.back();
  }

}
