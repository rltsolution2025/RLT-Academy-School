import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Matriculation } from './matriculation';

describe('Matriculation', () => {
  let component: Matriculation;
  let fixture: ComponentFixture<Matriculation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Matriculation],
    }).compileComponents();

    fixture = TestBed.createComponent(Matriculation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
