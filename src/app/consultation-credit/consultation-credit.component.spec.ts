import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCreditComponent } from './consultation-credit.component';

describe('ConsultationCreditComponent', () => {
  let component: ConsultationCreditComponent;
  let fixture: ComponentFixture<ConsultationCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
