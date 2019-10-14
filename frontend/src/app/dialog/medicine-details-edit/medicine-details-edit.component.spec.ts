import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDetailsEditComponent } from './medicine-details-edit.component';

describe('MedicineDetailsEditComponent', () => {
  let component: MedicineDetailsEditComponent;
  let fixture: ComponentFixture<MedicineDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
