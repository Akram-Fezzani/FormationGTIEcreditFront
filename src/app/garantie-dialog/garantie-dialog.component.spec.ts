import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantieDialogComponent } from './garantie-dialog.component';

describe('GarantieDialogComponent', () => {
  let component: GarantieDialogComponent;
  let fixture: ComponentFixture<GarantieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarantieDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
