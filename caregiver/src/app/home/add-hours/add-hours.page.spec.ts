import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHoursPage } from './add-hours.page';

describe('AddHoursPage', () => {
  let component: AddHoursPage;
  let fixture: ComponentFixture<AddHoursPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
