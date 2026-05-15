import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionTable } from './admission-table';

describe('AdmissionTable', () => {
  let component: AdmissionTable;
  let fixture: ComponentFixture<AdmissionTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AdmissionTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
