import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlyDataByPatientPage } from './monthly-data-by-patient.page';

describe('MonthlyDataByPatientPage', () => {
  let component: MonthlyDataByPatientPage;
  let fixture: ComponentFixture<MonthlyDataByPatientPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MonthlyDataByPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
