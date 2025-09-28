import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rd } from './rd';

describe('Rd', () => {
  let component: Rd;
  let fixture: ComponentFixture<Rd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
