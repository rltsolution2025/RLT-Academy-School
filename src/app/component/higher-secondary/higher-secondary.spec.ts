import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherSecondary } from './higher-secondary';

describe('HigherSecondary', () => {
  let component: HigherSecondary;
  let fixture: ComponentFixture<HigherSecondary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HigherSecondary],
    }).compileComponents();

    fixture = TestBed.createComponent(HigherSecondary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
