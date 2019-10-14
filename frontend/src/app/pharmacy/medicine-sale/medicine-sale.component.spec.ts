import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineSaleComponent } from './medicine-sale.component';

describe('MedicineSaleComponent', () => {
  let component: MedicineSaleComponent;
  let fixture: ComponentFixture<MedicineSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
