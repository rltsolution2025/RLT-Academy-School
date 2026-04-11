import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laborartories } from './laborartories';

describe('Laborartories', () => {
  let component: Laborartories;
  let fixture: ComponentFixture<Laborartories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Laborartories],
    }).compileComponents();

    fixture = TestBed.createComponent(Laborartories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
