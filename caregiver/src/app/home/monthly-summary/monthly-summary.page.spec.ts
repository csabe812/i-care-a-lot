import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlySummaryPage } from './monthly-summary.page';

describe('MonthlySummaryPage', () => {
  let component: MonthlySummaryPage;
  let fixture: ComponentFixture<MonthlySummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MonthlySummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
