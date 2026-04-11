import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTeachers } from './our-teachers';

describe('OurTeachers', () => {
  let component: OurTeachers;
  let fixture: ComponentFixture<OurTeachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTeachers],
    }).compileComponents();

    fixture = TestBed.createComponent(OurTeachers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
