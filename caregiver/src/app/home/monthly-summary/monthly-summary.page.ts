import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatientService } from '../patient.service';
import { HttpClientModule } from '@angular/common/http';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';


@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.page.html',
  styleUrls: ['./monthly-summary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [PatientService]
})
export class MonthlySummaryPage implements OnInit {
  patients: any[] = [];
  patientHours: any[] = [];
  patientHoursData: any[] = [];
  data: any[] = [];

  currentYear = new Date().getFullYear();
  monthNames = ["január", "február", "március", "április", "május", "június",
    "július", "augusztus", "szeptember", "október", "november", "december"
  ];
  monthStatusText: string = "";
  currentMonthName: string = "";
  previousMonthName: string = "";
  isPrevMonthActive: boolean = false;
  activeMonthNumber: number = 0;

  isLoading: boolean = true;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.patientService.fetchPatients().subscribe(patients => {
      this.patients = patients;
      this.patientService.fetchHours().subscribe(patientHours => {
        this.patientHours = patientHours;
        this.initData();
        this.data = this.data.filter(f => f.hours > 0 && f.name && f.name.length > 0);
        this.isLoading = false;
      });
    })
  }

  initData() {
    this.initializeMonthNames();
    this.initPatientHours();
    this.filterPatientHoursByMonth();
  }

  initPatientHours() {
    this.patientHoursData = [];
    this.data = [];
    for (let i of this.patientHours) {
      const patientName = this.patients.find(f => i.patientId === f.id)?.name;
      this.patientHoursData.push({ ...i, patientName });
    }

    for (let i of this.patientHoursData) {
      const pati = this.data.find(f => f.name === i.patientName);
      if (pati == null) {
        const name = i.patientName;
        const date = i.date;
        if (name && name.length > 0) {
          this.data.push({ name, hours: 0, date });
        }
      }
    }
  }

  filterPatientHoursByMonth() {
    for (let i of this.patientHoursData) {
      const patient = this.data.find(f => f.name === i.patientName);
      if (patient && new Date(i.date).getMonth() === this.activeMonthNumber) {
        patient.hours += +i.hours;
      }
    }
  }

  initializeMonthNames() {
    this.activeMonthNumber = new Date().getMonth() - (this.isPrevMonthActive ? 1 : 0);
    this.monthStatusText = this.isPrevMonthActive ? "Következő" : "Előző";
    this.previousMonthName = "";
    this.currentMonthName = this.monthNames[this.activeMonthNumber];
    if (this.activeMonthNumber === 0) {
      this.previousMonthName = this.monthNames.at(-1) || "";
    }
    else {
      const differenceNumber = !this.isPrevMonthActive ? -1 : 1;
      this.previousMonthName = this.monthNames[this.activeMonthNumber + differenceNumber];
    }
  }

  showMonthData() {
    this.isPrevMonthActive = !this.isPrevMonthActive;
    this.initData();
    this.data = this.data.filter(f => f.hours > 0 && f.name && f.name.length > 0);
  }

  async writeToClipboard() {
    let clipboardData = "";
    for(let i of this.data) {
      const d = i.name + ": " +i.hours + " óra\n";
      clipboardData += d;
    }
    await Clipboard.write({
      string: clipboardData
    });
    await this.showToast();    
  };

  async showToast() {
    await Toast.show({
      text: 'Adatok másolása sikeres!',
    });
  };

}
