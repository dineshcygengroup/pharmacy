import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEditDialogComponent } from './supplier-edit-dialog.component';

describe('SupplierEditDialogComponent', () => {
  let component: SupplierEditDialogComponent;
  let fixture: ComponentFixture<SupplierEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
