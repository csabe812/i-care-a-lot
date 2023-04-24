import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'add-patient',
    loadComponent: () => import('./home/add-patient/add-patient.page').then( m => m.AddPatientPage)
  },
  {
    path: 'add-hours/:id',
    loadComponent: () => import('./home/add-hours/add-hours.page').then( m => m.AddHoursPage)
  },
  {
    path: 'monthly-summary',
    loadComponent: () => import('./home/monthly-summary/monthly-summary.page').then( m => m.MonthlySummaryPage)
  }
];
