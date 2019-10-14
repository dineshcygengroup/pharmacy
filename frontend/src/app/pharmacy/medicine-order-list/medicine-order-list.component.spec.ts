import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineOrderListComponent } from './medicine-order-list.component';

describe('MedicineOrderListComponent', () => {
  let component: MedicineOrderListComponent;
  let fixture: ComponentFixture<MedicineOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
