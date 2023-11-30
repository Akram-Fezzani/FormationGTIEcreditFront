import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDeCreditComponent } from './demande-de-credit.component';

describe('DemandeDeCreditComponent', () => {
  let component: DemandeDeCreditComponent;
  let fixture: ComponentFixture<DemandeDeCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeDeCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeDeCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
