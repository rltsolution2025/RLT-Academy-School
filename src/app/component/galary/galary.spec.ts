import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Galary } from './galary';

describe('Galary', () => {
  let component: Galary;
  let fixture: ComponentFixture<Galary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galary],
    }).compileComponents();

    fixture = TestBed.createComponent(Galary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
